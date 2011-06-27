/**
 * random cocktail view - shake your own random cocktail
 */

var win = Titanium.UI.currentWindow;

var currentWindow = 'random';

var randomImage = Titanium.UI.createImageView({
	image:'../images/shaker.jpg'
});

win.backgroundColor = 'white';

function updateRandomView(orientation) {
	if(orientation == Ti.UI.LANDSCAPE_LEFT || orientation == Ti.UI.LANDSCAPE_RIGHT){
		randomImage.width = 500*400/922;
		randomImage.height = 500;
	} else {
		randomImage.width = 700*400/922;
		randomImage.height = 700;
	}
	randomImage.left = 'auto';
	randomImage.top = 10;
	randomImage.bottom = 10;
}

function updateRandomDetailView(orientation) {
	if(orientation == Ti.UI.LANDSCAPE_LEFT || orientation == Ti.UI.LANDSCAPE_RIGHT){
		randomImage.width = 550*400/922;
		randomImage.height = 550;
		randomImage.left = 50;
	} else {
		randomImage.width = 620*400/922;
		randomImage.height = 620;
		randomImage.left = 20;
	}
	randomImage.top = 40;
	randomImage.bottom = 40;
}

win.addEventListener('focus', function (e){
	currentWindow = 'random';
	win.add(randomImage);
	updateRandomView(Titanium.Gesture.orientation);
	
});

Titanium.Gesture.addEventListener('orientationchange', function(e){
	if(currentWindow == 'random'){
		updateRandomView(e.orientation);
	} else if(currentWindow == 'randomDetail'){
		updateRandomDetailView(e.orientation);	
	}
});

if (Titanium.Media.audioPlaying) {
	Titanium.Media.defaultAudioSessionMode = Titanium.Media.AUDIO_SESSION_MODE_AMBIENT;
}

// load shake sound
var sound = Titanium.Media.createSound({
	url:'../sound/shaker.wav'
});

var CocktailApp = Titanium.UI.currentWindow.app;

var recipes = CocktailApp.recipes;

var randomDetailWindow = Titanium.UI.createWindow({
	title : 'Cocktail',
	backgroundColor: 'white'
});

var counter = 0;

win.addEventListener('focus', function (e){
	counter = 0;
});

randomDetailWindow.addEventListener('focus', function (e){
	currentWindow = 'randomDetail';
	randomDetailWindow.add(randomImage);
	randomDetailWindow.add(CocktailApp.recipeScrollView);
	updateRandomDetailView(Titanium.Gesture.orientation);
});

randomDetailWindow.addEventListener('blur', function (e){
	randomDetailWindow.remove(randomImage);	
});

Ti.Gesture.addEventListener('shake',function(e) {
		counter++;
		// play shake sound
		sound.play();
		// find random recipe and show it in the random cocktail tab
		var numberOfRecipes = recipes.length;
		var randomRecipeNumber = Math.floor(Math.random()*numberOfRecipes);
		var randomRecipe = recipes[randomRecipeNumber];

		if(counter == 1){
			Titanium.UI.currentWindow.tab.open(randomDetailWindow);
		}
		
		randomDetailWindow.title = randomRecipe.title;
		CocktailApp.recipeScrollView.currentPage = randomRecipeNumber;
});
