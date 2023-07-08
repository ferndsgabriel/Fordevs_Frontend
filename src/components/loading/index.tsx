import {ImSpinner6} from "react-icons/im";
import {AiFillGithub, AiFillLinkedin} from "react-icons/ai";
import style from "./styles.module.scss";

import Link from "next/link";
export function Loading (){
    return(
        <main className={style.container}>
            <div className={style.conteudo}>
                <span className={style.spin}><ImSpinner6/> </span>
                <span className={style.text}>
                    <p color="#ffffff9f">Enquanto isso você pode acessar meu <Link
                     href={'https://github.com/fndsgabriel'}><AiFillGithub color="#fff"/>
                     </Link> ou <Link
                      href={'https://www.linkedin.com/in/ferndsgabriel/'}>
                        <AiFillLinkedin color="#fff"/></Link>
                    </p>
                </span>
            </div>
        </main>
    )
}