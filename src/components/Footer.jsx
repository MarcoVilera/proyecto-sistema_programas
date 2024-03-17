import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import '../styles/Footer.css'
export const Footer = () => {
    return (
        <footer className="footer">
            <div className="wrap-footer">
                <div className="text-element-footer element-footer">
                    <h3>Restaurante</h3>
                    <p>
                        Rincon Campesino Tradicion y recetas de familia que se
                        crean como el primer Restaurante tipico de nuestra zona
                        penquista.
                    </p>
                </div>
                <div className="text-element-footer element-footer">
                    <h5>Dirección</h5>
                    <ul>
                        <li>Calle, Nonguen 1965</li>
                        <li>Tel: (+56) 041 2490012</li>
                        <li>Correo: cl@rinconcampesino.cl</li>
                    </ul>
                </div>
                <div className="text-element-footer element-footer">
                    <h5>Más información</h5>
                    <ul>
                        <li>
                            <a href="index.html">Inicio</a>
                        </li>
                        <li>
                            <a href="PAGINA NOSOTROS/NOSOTROS.html">Nosotros</a>
                        </li>
                        <li>
                            <a href="/">Carta</a>
                        </li>
                        <li>
                            <a href>Blog</a>
                        </li>
                        <li>
                            <a href="PAGINA CONTACTO/CONTACTO.html">Contacto</a>
                        </li>
                    </ul>
                </div>
                <div className="rrss-element-footer element-footer">
                    <h5>Redes Sociales</h5>
                    <ul>
                        <li>
                            <a href="/">
                                <FaFacebook size={'45px'} color='white' />
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <FaInstagram size={'45px'} color='white' />
                            </a>
                        </li>
                        <li>
                            <a href="/"><FaWhatsapp size={'45px'} color='white'/></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-creds">
                <div className="copy-creds">
                    <p>©2024 · Todos los derechos reservados.</p>
                </div>
                <div className="legal-creds">
                    <ul>
                        <li>
                            <a href="/">Política de Privacidad</a>
                        </li>
                        <li>
                            <a href="/">Política de Cookies</a>
                        </li>
                        <li>
                            <a href="/">Aviso Legal</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
