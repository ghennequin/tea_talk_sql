/**
 * A plugin which enables rendering of math equations inside
 * of reveal.js slides. Essentially a thin wrapper for MathJax.
 *
 * @author Hakim El Hattab
 */
var RevealMath = window.RevealMath || (function(){

	var options = Reveal.getConfig().math || {};
	options.mathjax = options.mathjax || 'https://cdn.mathjax.org/mathjax/latest/MathJax.js';
	options.config = options.config || 'TeX-AMS-MML_SVG';

	loadScript( options.mathjax + '?config=' + options.config, function() {

		MathJax.Hub.Config({
			messageStyle: 'none',
			tex2jax: { inlineMath: [['$','$'],['\\(','\\)']] },
			skipStartupTypeset: true,
      TeX: {
        Macros: {
        b: ["{\\mathbf{#1}}",1],
        d: "{\\sf{d}}"
        }}
    });


    MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready",function () {
      var VARIANT = MathJax.OutputJax["HTML-CSS"].FONTDATA.VARIANT;
      VARIANT["normal"].fonts.unshift("MathJax_SansSerif");
      VARIANT["bold"].fonts.unshift("MathJax_SansSerif-bold");
      VARIANT["italic"].fonts.unshift("MathJax_SansSerif-italic");
      VARIANT["-tex-mathit"].fonts.unshift("MathJax_SansSerif-italic");
    });

    MathJax.Hub.Register.StartupHook("SVG Jax Ready",function () {
      var VARIANT = MathJax.OutputJax.SVG.FONTDATA.VARIANT;
      VARIANT["normal"].fonts.unshift("MathJax_SansSerif");
      VARIANT["bold"].fonts.unshift("MathJax_SansSerif-bold");
      VARIANT["italic"].fonts.unshift("MathJax_SansSerif-italic");
      VARIANT["-tex-mathit"].fonts.unshift("MathJax_SansSerif-italic");
    });

		// Typeset followed by an immediate reveal.js layout since
		// the typesetting process could affect slide height
		MathJax.Hub.Queue( [ 'Typeset', MathJax.Hub ] );
		MathJax.Hub.Queue( Reveal.layout );

		// Reprocess equations in slides when they turn visible
		Reveal.addEventListener( 'slidechanged', function( event ) {

			MathJax.Hub.Queue( [ 'Typeset', MathJax.Hub, event.currentSlide ] );

		} );

	} );

	function loadScript( url, callback ) {

		var head = document.querySelector( 'head' );
		var script = document.createElement( 'script' );
		script.type = 'text/javascript';
		script.src = url;

		// Wrapper for callback to make sure it only fires once
		var finish = function() {
			if( typeof callback === 'function' ) {
				callback.call();
				callback = null;
			}
		}

		script.onload = finish;

		// IE
		script.onreadystatechange = function() {
			if ( this.readyState === 'loaded' ) {
				finish();
			}
		}

		// Normal browsers
		head.appendChild( script );

	}

})();
