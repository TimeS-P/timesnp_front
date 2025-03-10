import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#F4E6D3] text-[#1D1D1D] py-8 px-4 md:px-16">
            <div className="max-w-6xl min-h-[15rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* Logo y descripción */}
                <div className="flex flex-col h-full pr-6 md:border-r border-gray-400">
                    <h2 className="text-2xl font-bold flex items-center">
                        <span className="text-black">Time</span>S&P
                    </h2>
                    <p className="mt-2 text-sm">
                        En TimeS&P conectamos personas con profesionales de confianza,
                        facilitando la contratación de servicios cotidianos de forma segura, rápida y eficiente.
                    </p>
                    <p className="text-xs mt-auto">© 2025 TimeS&P</p>
                </div>


                {/* Sección de enlaces */}
                <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 pl-6">
                    {/* Compañía */}
                    <div>
                        <h3 className="font-semibold border-b border-gray-400 pb-2 mb-3">Compañía</h3>
                        <ul className="text-sm space-y-1">
                            <li><Link to="" className="hover:underline">Servicios</Link></li>
                            <li><Link to="" className="hover:underline">Chat</Link></li>
                            <li><Link to="" className="hover:underline">Combos</Link></li>
                            <li><Link to="" className="hover:underline">Sobre nosotros</Link></li>
                        </ul>
                    </div>


                    {/* Soporte */}
                    <div>
                        <h3 className="font-semibold border-b border-gray-400 pb-2 mb-3">Soporte</h3>
                        <ul className="text-sm space-y-1">
                            <li><Link to="" className="hover:underline">Términos y condiciones</Link></li>
                            <li><Link to="" className="hover:underline">Privacidad</Link></li>
                        </ul>
                    </div>


                    {/* Contacto y redes sociales */}
                    <div className="flex flex-col h-full">

                        <h3 className="font-semibold border-b border-gray-400 pb-2 mb-3">Contáctanos</h3>
                        <p className="text-sm flex items-center gap-2">
                            <img src="/assets/Footer/icon-phone.svg" alt="Teléfono" className="w-5 h-5" />
                            443 120 5849
                        </p>
                        <p className="text-sm flex items-center gap-2">
                            <img src="/assets/Footer/icon-email.svg" alt="Correo" className="w-5 h-5" />
                            timesnp@gmail.com
                        </p>


                        <h3 className="font-semibold border-b border-gray-400 pb-2 mt-auto mb-3">Síguenos</h3>
                        <div className="flex space-x-4 text-xl justify-between">
                            <Link to="" className="hover:opacity-80">
                                <img src="/assets/Footer/icon-facebook.svg" alt="Facebook" className="w-6 h-6" />
                            </Link>
                            <Link to="" className="hover:opacity-80">
                                <img src="/assets/Footer/icon-instagram.svg" alt="Instagram" className="w-6 h-6" />
                            </Link>
                            <Link to="" className="hover:opacity-80">
                                <img src="/assets/Footer/icon-x.svg" alt="X" className="w-6 h-6" />
                            </Link>
                            <Link to="" className="hover:opacity-80">
                                <img src="/assets/Footer/icon-telegram.png" alt="Telegram" className="w-6 h-6" />
                            </Link>
                        </div>

                    </div>
                </div>


            </div>
        </footer>
    )
}

export default Footer;