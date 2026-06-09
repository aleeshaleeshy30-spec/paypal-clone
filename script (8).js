let currentUser = null;
let balance = 1248.75;

const transactions = [
    { type: "received", from: "Sarah Khan", amount: 45.00, date: "Today" },
    { type: "sent", to: "Ahmed Ali", amount: 120.00, date: "Yesterday" },
    { type: "received", from: "Freelance Gig", amount: 250.00, date: "Jun 7" },
];

function showSection(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(section + '-section').classList.remove('hidden');
}

function showLogin() {
    showSection('login');
}

function showSignup() {
    showSection('signup');
}

function login() {
    const email = document.getElementById('login-email').value;
    if (email) {
        currentUser = email.split('@')[0];
        document.getElementById('nav-username').textContent = currentUser;
        document.getElementById('user-nav').classList.remove('hidden');
        showSection('dashboard');
        renderDashboard();
    } else {
        alert("Please enter your email");
    }
}

function signup() {
    const name = document.getElementById('signup-name').value;
    if (name) {
        currentUser = name.split(' ')[0];
        document.getElementById('nav-username').textContent = currentUser;
        document.getElementById('user-nav').classList.remove('hidden');
        showSection('dashboard');
        renderDashboard();
    }
}

function logout() {
    currentUser = null;
    document.getElementById('user-nav').classList.add('hidden');
    showSection('home');
}

function renderDashboard() {
    document.getElementById('username-display').textContent = currentUser || "User";
    document.getElementById('balance').textContent = `$${balance.toFixed(2)}`;

    const container = document.getElementById('transactions-list');
    container.innerHTML = transactions.map(t => `
        <div class="transaction bg-white p-6 rounded-3xl shadow flex justify-between items-center">
            <div>
                <p class="font-medium">${t.type === 'sent' ? 'Sent to' : 'Received from'} <span class="font-semibold">${t.to || t.from}</span></p>
                <p class="text-sm text-gray-500">${t.date}</p>
            </div>
            <p class="${t.type === 'sent' ? 'text-red-600' : 'text-green-600'} font-bold text-xl">
                ${t.type === 'sent' ? '-' : '+'}$${t.amount}
            </p>
        </div>
    `).join('');
}

function showSendMoneyModal() {
    document.getElementById('send-modal').classList.remove('hidden');
    document.getElementById('send-modal').classList.add('flex');
}

function closeModals() {
    document.getElementById('send-modal').classList.add('hidden');
    document.getElementById('send-modal').classList.remove('flex');
}

function sendMoney() {
    const amount = parseFloat(document.getElementById('amount').value);
    const recipient = document.getElementById('recipient').value;
    
    if (amount && recipient) {
        if (amount > balance) {
            alert("Insufficient balance!");
            return;
        }
        balance -= amount;
        
        transactions.unshift({
            type: "sent",
            to: recipient,
            amount: amount,
            date: "Just now"
        });
        
        closeModals();
        renderDashboard();
        alert(`✅ $${amount} sent to ${recipient} successfully!`);
    } else {
        alert("Please fill all fields");
    }
}

function showReceiveModal() {
    const amount = prompt("Enter amount to request:");
    if (amount) {
        alert(`Request for $${amount} sent! (Demo)`);
    }
}

function showForgotPassword() {
    alert("Password reset link has been sent to your email (Demo)");
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});