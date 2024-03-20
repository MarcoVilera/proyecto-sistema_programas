import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import '../styles/Footer.css'
import { Link } from 'react-router-dom'
export const Footer = () => {
    return (
        <footer className="footer">
            <div className="wrap-footer">
                <div className="text-element-footer element-footer">
                    <h1>Pricet@g</h1>
                    <p>
                        Aqui encontraras los mejores precios en las mejores tiendas de Valencia.
                        Contamos con una gran variedad de productos y  ofertas exclusivas para que puedas encontrar lo que buscas.
                        Todo a un solo click de distancia
                    </p>
                </div>
                <div className="text-element-footer element-footer">
                    <h5>Dirección</h5>
                    <ul>
                        <li>Calle, Nonguen 1965</li>
                        <li>Tel: (+56) 041 2490012</li>
                        <li>Correo: adminprice@pricet@g.com</li>
                    </ul>
                </div>
                <div className="text-element-footer element-footer">
                    <h5>Más información</h5>
                    <ul>
                        <li>
                            <Link to={'/'}>Inicio</Link>
                        </li>
                        <li>
                            <Link to={'/About'}>Nosotros</Link>
                        </li>
                        <li>
                            <Link to={'/About'}>Contacto</Link>
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
                            <a href="#">Política de Privacidad</a>
                        </li>
                        <li>
                            <a href="#">Política de Cookies</a>
                        </li>
                        <li>
                            <a href="#">Aviso Legal</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
