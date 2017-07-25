// script.js (Eric Gregor)

var topStories = {
	url : "https://api.nytimes.com/svc/topstories/v2/",
	apiKey: "975bddbb05904c2785109f1a9346e9d7",

	getSectionUrl: function (section) {
		var url = topStories.url + section + ".json";

		url += '?' + $.param({
  			'api-key': topStories.apiKey
		});

		return url;
	},

	getStories: function () {
		var section = document.getElementById("sections").value;

		if (section.length == 0) {
			// if no section provided, then just reload the page to clear the stories

			location.reload();

			return;
		}

		// get top stories

		var url = topStories.getSectionUrl(section);

		$.ajax({
		  	url: url,
		  	method: 'GET',
		}).done(function(result) {
			var i;
			var storyId;
			var storyCount;

			// remove super size logo when section selected in dropdown

			$('header div div img').removeClass('logo-super-mobile logo-super-tablet logo-super-desktop');

			// remove any previously inserted content to make sure that it doesn't interfere with new content

			$('.story-box').remove();

			// insert new content

			storyCount = 0;

			for (i = 0; i < result.results.length; i++)
			{
		  		if (result.results[i].multimedia.length > 0) {
		  			storyId = 'story' + (i+1).toString();

					$('#clone').clone()
						.attr({"id": storyId})
						.insertBefore('#clone');

					$('#' + storyId).addClass('story-box'); // add class to help identify inserted content
					$('#' + storyId).css('background-image', 'url(' + result.results[i].multimedia[4].url + ')');
					$('#' + storyId + ' a').html(result.results[i].abstract);
					$('#' + storyId + ' a').attr("href",result.results[i].url);

					storyCount += 1;

					// limit the number of stories to 12

					if (storyCount >= 12) {
						break;
					}
				}
			}
		}).fail(function(err) {
		  	throw err;
		});
	}
}

window.onload = function () {
	// check if jQuery loaded

    if (!window.jQuery) {
    	console.log("jQuery not loaded");
    }

    // attach 'getStories' function to section dropdown

	$("#sections").change(function() {
		topStories.getStories();
	});
};

// initialize section dropdown

var sections = [
	{value: "", description: "Please select"},
	{value: "home", description: "Home"},
	{value: "opinion", description: "Opinion"},
	{value: "world", description: "World"},
	{value: "national", description: "National"},
	{value: "politics", description: "Politics"},
	{value: "upshot", description: "Upshot"},
	{value: "nyregion", description: "NY Region"},
	{value: "business", description: "Business"},
	{value: "technology", description: "Technology"},
	{value: "science", description: "Science"},
	{value: "health", description: "Health"},
	{value: "sports", description: "Sports"},
	{value: "arts", description: "Arts"},
	{value: "books", description: "Books"},
	{value: "movies", description: "Movies"},
	{value: "theater", description: "Theater"},
	{value: "sundayreview", description: "Sunday Review"},
	{value: "fashion", description: "Fashion"},
	{value: "tmagazine", description: "T Magazine"},
	{value: "food", description: "Food"},
	{value: "travel", description: "Travel"},
	{value: "magazine", description: "Magazine"},
	{value: "realestate", description: "Real Estate"},
	{value: "automobiles", description: "Automobiles"},
	{value: "obituaries", description: "Obituaries"},
	{value: "insider", description: "Insider"}
];

var sel = document.getElementById('sections');

for(var i = 0; i < sections.length; i++) {
    var opt = document.createElement('option');
    opt.innerHTML = sections[i].description;
    opt.value = sections[i].value;
    sel.appendChild(opt);
}
