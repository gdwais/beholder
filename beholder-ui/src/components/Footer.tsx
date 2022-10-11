export const Footer = () => {
    return (<footer>

        <div className="row">
           <div className="twelve columns">
              <ul className="social-links">
                 {/* {networks} */}
              </ul>
   
              <ul className="copyright">
                 <li>&copy; Copyright { new Date().getFullYear() } Dalton Wais </li>
                 <li>source code availible on <a title="Styleshout" href="https://github.com/gdwais/daltonwais">github</a></li>
              </ul>
   
           </div>
           <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open"></i></a></div>
        </div>
     </footer>)
}