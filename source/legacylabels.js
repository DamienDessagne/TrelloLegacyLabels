MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var hasDotCSS = false;
var isUpdating = false;

updateLabelOnChange = function(mutations, observer) {
	var labelContainers = document.getElementsByClassName("list-card-front-labels-container");
	if(labelContainers.length == 0)
		return;
	
	var s = "";
	for(var i = 0 ; i < labelContainers.length ; i++) {
		var buttons = labelContainers[i].getElementsByTagName("button");
		if(buttons != null && buttons.length > 0) {
			for(var j = 0 ; j < buttons.length ; j++) {
				var b = buttons[j];
				if(b.getAttribute("data-expanded") == "false") {
					b.style.color = "transparent";
				}
				else {
					var dot = window.getComputedStyle(b,':before');
					b.style.backgroundColor = dot.backgroundColor;
					if(!b.classList.contains("legacy-label"))
						b.classList.add("legacy-label");
				}
			}
		}
	}
	isUpdating = false;
};


updateLabels = function() {
	if(isUpdating) // -> update already in progress
		return;
	
	isUpdating = true;
	
	// Hide the little dot on labels :
	if(!hasDotCSS) {
		var style = document.createElement("style")
		document.head.appendChild(style);
		style.sheet.insertRule("button.legacy-label::before { width:0px!important; }", style.sheet.cssRules.length);
		style.sheet.insertRule("button.legacy-label { color:#ffffff; font-weight:bold; padding-left:8px;}", style.sheet.cssRules.length);
		hasDotCSS = true;
	}

	// Observe DOM mutations and apply modifications on the fly :
	observer = new MutationObserver(updateLabelOnChange);
	observer.observe(document.body, {
		subtree: true,
		attributes: true
	});
}

// Act only when we're on a Trello board
if(window.location.pathname.startsWith('/b/'))
	updateLabels();

// Monitor URI changes :
var currentPath = window.location.pathname;

setInterval(
	function() {
		if(window.location.pathname == currentPath)
			return;
		
		currentPath = window.location.pathname;
		hasDotCSS = false;
		if(currentPath.startsWith('/b/'))
			updateLabels();
		
	},
	500
);