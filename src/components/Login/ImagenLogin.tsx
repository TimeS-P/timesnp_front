function ImagenLogin() {
  return (
    <div
      className="w-1/2 h-[500px] flex items-center justify-center text-white text-2xl bg-cover bg-center relative"
      style={{ backgroundImage: "url('/FondoLogin.png')" }}
    >
      <img
        src="/LogoBlanco.png"
        alt="Logo"
        className="absolute top-8 right-4 w-40 h-auto"
      />
    </div>
  );
}

export default ImagenLogin;
