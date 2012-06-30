var Track = function(artist, title) {
		
	

	this.render = function() {

		var iframe = $("<iframe src='' width=200 height=200/>");
		iframe.attr("src", "http://toma.hk/embed.php?artist="+artist+"&title="+title);

		$('#results').append(iframe);

	}


}