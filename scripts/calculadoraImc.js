document.getElementById('imcForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const altura = document.getElementById('altura').value / 100;
    const peso = document.getElementById('peso').value;
    const imc = (peso / (altura * altura)).toFixed(2);
    document.getElementById('imc').value = imc;
});