const tasaCambio = 1370;

document.getElementById('divisaForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const usd = document.getElementById('usd').value;
    const ars = (usd * tasaCambio).toFixed(2);
    document.getElementById('ars').value = ars;
});