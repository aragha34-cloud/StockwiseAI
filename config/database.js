const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'stockwise.json');
const dataDir = path.join(__dirname, '..', 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize default data structure
let db = {
  users: [],
  portfolio_holdings: [],
  transactions: [],
  learning_progress: [],
  stock_cache: {}
};

// Load database from file
function loadDatabase() {
  if (fs.existsSync(dbPath)) {
    try {
      const data = fs.readFileSync(dbPath, 'utf8');
      db = JSON.parse(data);
    } catch (error) {
      console.error('Error loading database:', error);
      db = { users: [], portfolio_holdings: [], transactions: [], learning_progress: [], stock_cache: {} };
    }
  }
  return db;
}

// Save database to file
function saveDatabase() {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving database:', error);
  }
}

// Initialize database with default data
function initDatabase() {
  loadDatabase();
  
  // Create default user if not exists
  if (!db.users.find(u => u.id === '1')) {
    db.users.push({
      id: '1',
      name: 'Nidhi Konanur',
      email: 'nidhikonantbsg@gmail.com',
      level: 'BEGINNER INVESTOR',
      experience_level: 'Beginner',
      risk_tolerance: 'Moderate',
      paper_balance: 8500.00,
      investment_streak: 2,
      last_active_date: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }

  // Create default holding if not exists
  if (!db.portfolio_holdings.find(h => h.user_id === '1' && h.symbol === 'AAPL')) {
    db.portfolio_holdings.push({
      id: require('uuid').v4(),
      user_id: '1',
      symbol: 'AAPL',
      company_name: 'Apple Inc.',
      shares: 10,
      purchase_price: 150.00,
      purchase_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    });

    db.transactions.push({
      id: require('uuid').v4(),
      user_id: '1',
      symbol: 'AAPL',
      type: 'BUY',
      shares: 10,
      price_per_share: 150.00,
      total_amount: 1500.00,
      transaction_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    });
  }

  // Create default learning progress if not exists
  const completedLessons = [
    { title: 'What is the Stock Market?', category: 'Basics' },
    { title: 'Growth Investing', category: 'Strategy' }
  ];

  completedLessons.forEach(lesson => {
    if (!db.learning_progress.find(p => p.user_id === '1' && p.lesson_title === lesson.title)) {
      db.learning_progress.push({
        id: require('uuid').v4(),
        user_id: '1',
        lesson_title: lesson.title,
        category: lesson.category,
        status: 'complete',
        completed_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
  });

  saveDatabase();
  console.log('✅ Database initialized successfully');
}

// Database interface object
const dbInterface = {
  prepare: (query) => {
    // Simple query parser for common operations
    return {
      get: (...params) => {
        loadDatabase();
        // Simple SELECT ... WHERE ... = ? implementation
        if (query.includes('SELECT') && query.includes('FROM')) {
          const tableMatch = query.match(/FROM\s+(\w+)/i);
          const whereMatch = query.match(/WHERE\s+(\w+)\s*=\s*\?/i);
          
          if (tableMatch && whereMatch) {
            const table = tableMatch[1];
            const column = whereMatch[1];
            if (db[table]) {
              return db[table].find(item => item[column] === params[0]) || null;
            }
          }
        }
        return null;
      },
      all: (...params) => {
        loadDatabase();
        // Simple SELECT ... WHERE ... = ? implementation
        if (query.includes('SELECT') && query.includes('FROM')) {
          const tableMatch = query.match(/FROM\s+(\w+)/i);
          const whereMatch = query.match(/WHERE\s+(\w+)\s*=\s*\?/i);
          
          if (tableMatch) {
            const table = tableMatch[1];
            if (db[table]) {
              if (whereMatch && params.length > 0) {
                const column = whereMatch[1];
                return db[table].filter(item => item[column] === params[0]);
              }
              return db[table];
            }
          }
        }
        return [];
      },
      run: (...params) => {
        loadDatabase();
        
        // INSERT implementation
        if (query.includes('INSERT INTO')) {
          const tableMatch = query.match(/INSERT INTO\s+(\w+)/i);
          if (tableMatch) {
            const table = tableMatch[1];
            if (!db[table]) db[table] = [];
            
            // Extract column names from query
            const columnsMatch = query.match(/\(([^)]+)\)/);
            if (columnsMatch) {
              const columns = columnsMatch[1].split(',').map(c => c.trim());
              const obj = {};
              columns.forEach((col, idx) => {
                obj[col] = params[idx];
              });
              db[table].push(obj);
              saveDatabase();
            }
          }
        }
        
        // UPDATE implementation
        if (query.includes('UPDATE')) {
          const tableMatch = query.match(/UPDATE\s+(\w+)/i);
          const setMatch = query.match(/SET\s+(.+?)\s+WHERE/i);
          const whereMatch = query.match(/WHERE\s+(\w+)\s*=\s*\?/i);
          
          if (tableMatch && setMatch && whereMatch) {
            const table = tableMatch[1];
            const column = whereMatch[1];
            const lastParam = params[params.length - 1]; // WHERE value
            
            if (db[table]) {
              const item = db[table].find(i => i[column] === lastParam);
              if (item) {
                // Simple SET parsing
                const setClause = setMatch[1];
                const updates = setClause.split(',').map(u => u.trim());
                updates.forEach(update => {
                  const [col, val] = update.split('=').map(s => s.trim());
                  if (val === '?') {
                    const idx = updates.indexOf(update);
                    item[col] = params[idx];
                  } else if (val.includes('CURRENT_TIMESTAMP')) {
                    item[col] = new Date().toISOString();
                  } else if (val.includes('-')) {
                    // Handle arithmetic like "paper_balance - ?"
                    const parts = val.split(/\s*-\s*/);
                    if (parts[1] === '?') {
                      item[col] = (item[parts[0].trim()] || 0) - params[params.length - 2];
                    }
                  }
                });
                saveDatabase();
              }
            }
          }
        }
        
        // DELETE implementation
        if (query.includes('DELETE FROM')) {
          const tableMatch = query.match(/DELETE FROM\s+(\w+)/i);
          const whereMatch = query.match(/WHERE\s+(\w+)\s*=\s*\?\s+AND\s+(\w+)\s*=\s*\?/i) || 
                            query.match(/WHERE\s+(\w+)\s*=\s*\?/i);
          
          if (tableMatch && whereMatch) {
            const table = tableMatch[1];
            if (db[table]) {
              if (whereMatch.length > 2) {
                // Two conditions
                db[table] = db[table].filter(item => 
                  !(item[whereMatch[1]] === params[0] && item[whereMatch[2]] === params[1])
                );
              } else {
                // One condition
                const column = whereMatch[1];
                db[table] = db[table].filter(item => item[column] !== params[0]);
              }
              saveDatabase();
            }
          }
        }
      },
      exec: (query) => {
        loadDatabase();
        // For CREATE TABLE, just ensure table exists
        if (query.includes('CREATE TABLE')) {
          const tableMatch = query.match(/CREATE TABLE IF NOT EXISTS\s+(\w+)/i);
          if (tableMatch) {
            const table = tableMatch[1].replace(/\s+/g, '_').toLowerCase();
            const tableName = tableMatch[1];
            if (!db[tableName]) {
              db[tableName] = [];
            }
          }
        }
        saveDatabase();
      }
    };
  }
};

// Initialize on first load
initDatabase();

module.exports = dbInterface;
