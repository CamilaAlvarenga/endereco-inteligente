// script.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-endereco");
  const cepInput = document.getElementById("cep");
  const ufInput = document.getElementById("uf");
  const logradouroInput = document.getElementById("logradouro");
  const numeroInput = document.getElementById("numero");

  // Regexs exigidos:
  // CEP formatado: grupos de captura para validar (ex: 12345-678)
  const cepRegex = /^(\d{5})-(\d{3})$/;
  // UF: exatamente 2 letras maiúsculas
  const ufRegex = /^[A-Z]{2}$/;
  // Número: apenas dígitos
  const numeroRegex = /^\d+$/;

  // --- Máscara automática de CEP enquanto digita ---
  cepInput.addEventListener("input", (e) => {
    // remove tudo que não for dígito
    let digits = e.target.value.replace(/\D/g, "");
    // limita a 8 dígitos
    if (digits.length > 8) digits = digits.slice(0, 8);

    // formata com grupo de captura
    if (digits.length > 5) {
      // primeiros 5 dígitos e últimos 3
      e.target.value = digits.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");
    } else {
      e.target.value = digits;
    }
  });

  // --- Converter UF para maiúsculo automaticamente durante a digitação ---
  ufInput.addEventListener("input", (e) => {
    const pos = e.target.selectionStart; // tentar manter cursor
    e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 2);
    try { e.target.selectionStart = e.target.selectionEnd = pos; } catch (_) {}
  });

  // --- Impedir caracteres não-numéricos no campo número (opcionalmente) ---
  numeroInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  });

  // --- Submissão com validações e alerts ---
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // exigido pelo enunciado

    // checagens de cada campo -> cada campo inválido gera um alert
    let valido = true;

    // CEP: deve obedecer regex com grupos de captura (xxxxx-xxx)
    if (!cepRegex.test(cepInput.value)) {
      alert("CEP inválido. Use o formato 00000-000.");
      valido = false;
    }

    // Logradouro: obrigatório e mínimo 5 caracteres
    const logradouroVal = logradouroInput.value.trim();
    if (!logradouroVal) {
      alert("Logradouro é obrigatório.");
      valido = false;
    } else if (logradouroVal.length < 5) {
      alert("Logradouro deve conter no mínimo 5 caracteres.");
      valido = false;
    }

    // Número: obrigatório, apenas dígitos
    const numeroVal = numeroInput.value.trim();
    if (!numeroVal) {
      alert("Número é obrigatório.");
      valido = false;
    } else if (!numeroRegex.test(numeroVal)) {
      alert("Número inválido. Use apenas dígitos.");
      valido = false;
    }

    // UF: obrigatório, apenas 2 letras maiúsculas (regex)
    const ufVal = ufInput.value.trim();
    if (!ufVal) {
      alert("UF é obrigatória.");
      valido = false;
    } else if (!ufRegex.test(ufVal)) {
      alert("UF inválida. Use 2 letras maiúsculas (ex: SP).");
      valido = false;
    }

    // Se tudo válido:
    if (valido) {
      alert("Endereço cadastrado com sucesso");
      // aqui você poderia enviar para backend, limpar form, etc.
      form.reset();
    }
  });
});
