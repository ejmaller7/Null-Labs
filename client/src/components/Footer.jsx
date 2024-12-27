import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";

const styles = {
    footer: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "1rem",
      backgroundColor: "#333",
      color: "#fff",
    },
    icon: {
      margin: "0 1rem",
      color: "#fff",
      textDecoration: "none",
      transition: "color 0.3s",
    },
};

const Footer = () => {
    return (
    <footer style={styles.footer}>
        {/* Ethan Footer */}
        <div>
            <h1>Ethan Maller</h1>
            <div>
            {/* Copy this same format just replace the link with your own link to your Github, LinkedIn & Third I have twitter but we can use something else or nothing else*/}
                <a
                    href="https://github.com/ejmaller7"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.icon}
                >
                    <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a
                    href="https://www.linkedin.com/in/ethan-maller/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.icon}
                >
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
                <a
                    href="https://x.com/ejmaller7"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.icon}
                >
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
            </div>
        </div>
        {/* Justin Footer */}
        <div>
            <h1>Justin Miller</h1>
            <div>
            {/* Copy this same format just replace the link with your own link to your Github, LinkedIn & Third I have twitter but we can use something else or nothing else*/}
                <a
                    href="https://github.com/JPMill"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.icon}
                >
                    <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a
                    href="https://www.linkedin.com/in/justin-miller-05047b293/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.icon}
                >
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
                <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.icon}
                >
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
            </div>
        </div>
        {/* Brian Footer */}
        <div>
            <h1>Brian Solano</h1>
            <div>
            {/* Copy this same format just replace the link with your own link to your Github, LinkedIn & Third I have twitter but we can use something else or nothing else*/}
                <a
                    href="https://github.com/ejmaller7"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.icon}
                >
                    <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a
                    href="https://www.linkedin.com/in/ethan-maller/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.icon}
                >
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
                <a
                    href="https://x.com/ejmaller7"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.icon}
                >
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
            </div>
        </div>
        {/* Chris Footer */}
        <div>
            <h1>Chris Fortier</h1>
            <div>
            {/* Copy this same format just replace the link with your own link to your Github, LinkedIn & Third I have twitter but we can use something else or nothing else*/}
                <a
                    href="https://github.com/ejmaller7"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.icon}
                >
                    <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a
                    href="https://www.linkedin.com/in/ethan-maller/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.icon}
                >
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
                <a
                    href="https://x.com/ejmaller7"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.icon}
                >
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
            </div>
        </div>
    </footer>
    );
};

export default Footer;