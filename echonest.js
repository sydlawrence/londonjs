var echonest = {
	apiKey: "GPQCPTGUIZ43M2FSV",

	baseUrl: "http://developer.echonest.com/api/v4/",

	execute: function(method, params, callback) {
		var url = this.baseUrl + method + "?api_key="+this.apiKey;
		for (var i in params) {
			url += "&" + i + "=" + params[i];
		}
		url += "&format=jsonp&callback=?";

		$.getJSON(url,function(data) {
			callback(data.response);
		});

	},

	similarArtists: function(artist, callback) {
		var method = "artist/similar";
		var params = {
			name: artist
		};
		this.execute(method, params, callback);
	},

	findSongsByDanceability: function(min, max, callback) {
		var method = "song/search";
		var params = {
			min_danceability: min,
			max_danceability: max,

		}
		this.execute(method, params, callback);
	},

	findSongsByParams: function(params, callback) {
		var method = "song/search";
		this.execute(method, params, callback);
	},

	findSongByArtist: function(artistID, callback) {
		var method = "artist/songs";
		var params = {
			id: artistID,
			results:1
		};
		this.execute(method, params, callback);

	}

}


function processForm() {
	echonest.findSongsByParams({
		min_danceability: $('#min_danceability').val(),
		max_danceability: $('#max_danceability').val(),
		min_energy:$('#min_energy').val(),
		max_energy:$('#max_energy').val(),
		song_min_hotttnesss:$('#song_min_hotttnesss').val(),
		song_max_hotttnesss:$('#song_max_hotttnesss').val()
	}, function(data) {
		$('#results').html("");
		for (var i = 0; i < data.songs.length;i++) {
			var song = data.songs[i];
			var track = new Track(song.artist_name, song.title);
			track.render();
		}
	})

}

$(document).ready(function() {
	
	$('#songSelectorOptions').on("submit", function(e) {
		e.preventDefault();
		processForm();
	});
	/*
	echonest.similarArtists("Rick Astley", function(response) {

		for (var i = 0; i < response.artists.length; i++) {
			(function(i){
				echonest.findSongByArtist(response.artists[i].id, function(songsResults) {
					var track = new Track(response.artists[i].name, songsResults.songs[0].title);
					track.render();
				});
			})(i);
			
		}
	});
	*/
});