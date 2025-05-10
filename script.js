
document.getElementById("imageInput").addEventListener("change", async function () {
  const file = this.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  document.getElementById("status").textContent = "Enviando imagem...";

  try {
    const res = await fetch("https://api.imgbb.com/1/upload?key=7d8a1c1f6a70c331ab26f135496eec4f", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    const imageUrl = data.data.url;

    const raUrl = `https://vytorlima.github.io/Minha-RA/ra.html?img=${encodeURIComponent(imageUrl)}`;
    document.getElementById("status").innerHTML = \`<p>Imagem enviada com sucesso!</p><a href="\${raUrl}" target="_blank">Abrir RA</a>\`;

    new QRCode(document.getElementById("qrcode"), {
      text: raUrl,
      width: 256,
      height: 256,
    });
  } catch (error) {
    console.error("Erro:", error);
    document.getElementById("status").textContent = "Erro ao enviar imagem.";
  }
});
