document.addEventListener('DOMContentLoaded', function() {
    // Game state
    let balance = 100;
    const symbols = ['🍒', '🍋', '🍊', '🍇', '🍉', '7️⃣'];
    
    // Bet amounts
    const bets = {
        low: 5,
        medium: 25,
        high: 100
    };
    
    // Minimum balances required
    const minBalances = {
        low: 10,
        medium: 50,
        high: 200
    };
    
    // Payout multipliers
    const payouts = {
        '🍒🍒🍒': 2,
        '🍋🍋🍋': 3,
        '🍊🍊🍊': 4,
        '🍇🍇🍇': 5,
        '🍉🍉🍉': 7,
        '7️⃣7️⃣7️⃣': 10
    };
    
    // Update balance display
    function updateBalance() {
        document.getElementById('balance').textContent = balance;
        
        // Enable/disable buttons based on balance
        document.getElementById('spin-low').disabled = balance < minBalances.low;
        document.getElementById('spin-medium').disabled = balance < minBalances.medium;
        document.getElementById('spin-high').disabled = balance < minBalances.high;
    }
    
    // Spin the slots
    function spin(betLevel) {
        const bet = bets[betLevel];
        if (balance < bet) {
            showMessage("Not enough chips to bet!");
            return;
        }
        
        // Deduct bet
        balance -= bet;
        updateBalance();
        
        // Get slot elements
        const slot1 = document.getElementById(`${betLevel}1`);
        const slot2 = document.getElementById(`${betLevel}2`);
        const slot3 = document.getElementById(`${betLevel}3`);
        
        // Disable buttons during animation
        document.getElementById('spin-low').disabled = true;
        document.getElementById('spin-medium').disabled = true;
        document.getElementById('spin-high').disabled = true;
        
        // Animate spinning
        let spins = 0;
        const totalSpins = 20;
        const spinInterval = setInterval(() => {
            slot1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            slot2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            slot3.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            
            spins++;
            if (spins >= totalSpins) {
                clearInterval(spinInterval);
                
                // Final result
                const result1 = symbols[Math.floor(Math.random() * symbols.length)];
                const result2 = symbols[Math.floor(Math.random() * symbols.length)];
                const result3 = symbols[Math.floor(Math.random() * symbols.length)];
                
                slot1.textContent = result1;
                slot2.textContent = result2;
                slot3.textContent = result3;
                
                // Check for win
                checkWin(result1, result2, result3, betLevel);
                
                // Re-enable buttons
                updateBalance();
            }
        }, 100);
    }
    
    // Check if the spin was a win
    function checkWin(s1, s2, s3, betLevel) {
        const result = s1 + s2 + s3;
        
        if (s1 === s2 && s2 === s3) {
            const multiplier = payouts[result] || 1;
            const winAmount = bets[betLevel] * multiplier;
            balance += winAmount;
            updateBalance();
            showMessage(`You won ${winAmount} chips! ${result} pays ${multiplier}x!`);
        } else {
            showMessage("No win this time. Try again!");
        }
    }
    
    // Show message to player
    function showMessage(msg) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = msg;
    }
    
    // Event listeners
    document.getElementById('spin-low').addEventListener('click', () => spin('low'));
    document.getElementById('spin-medium').addEventListener('click', () => spin('medium'));
    document.getElementById('spin-high').addEventListener('click', () => spin('high'));
    
    // Initialize
    updateBalance();
});
