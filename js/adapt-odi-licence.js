define([
  'core/js/adapt',
], function(Adapt) {

    var licencePage = _.extend({
  
    initialize: function() {
    	this.listenTo(Adapt, 'licencePage:showLicencePage', this.showLicencePage);
    	this.listenTo(Adapt, 'router:course', this.updateCourse);
    	this.listenTo(Adapt, 'pageView:ready', this.addLink);
        this.listenTo(Adapt, 'menuView:ready', this.addLink);
        this.listenTo(Adapt, 'router:page', this.updatePage);
    },

    updateCourse: function(target) {
    	this.currentCourse = target;
    },

    getCourse: function() {
    	return this.currentCourse;
    },
    
    updatePage: function(target) {
        this.contentObject = target;
    },

    getPage: function() {
        return this.contentObject;
    },

    addLink: function() {
        var title = "Licence";
        try {
            title = Adapt.course.get('_globals')._extensions._ODILicence.linkText;
        
            if( $('.about-links').prop('innerHTML').trim().length > 0) {
            	$('.about-links').append(' | ');
            } 
            $('.about-links').append('<a class="about" onClick="require(\'core/js/adapt\').trigger(\'licencePage:showLicencePage\'); return false;">'+title+'</a>');
	} catch(err) {}
    },
    
    showLicencePage: function() {
        var items = [];
        try {
            items = this.contentObject.get('_ODILicence')._items;
        } catch(err) {}
        if (items.length < 1) {
            items = Adapt.course.get('_ODILicence')._items;
        }
        
        var title = "Licence";
        try {
            title = Adapt.course.get('_globals')._extensions._ODILicence.titleText;
        } catch(err) {}
    	var string = "";
    	var count = 1;
 		_.each(items, function(item) {
			var graphic = item._graphic;
			if (graphic.src) {
				string += "<div class='licencePageGraphicElement'><img class='licencePageGraphic' src='" + graphic.src + "'/></div>";
			}
	 		string += "<div class='licencePageText'>";
			string += "<h2>" + item.title + "</h2>";
 			string += "<p>" + item.description + "</p>";
			string += "</div>";
 			string += "<hr class='licencePageRule'/>";
    	});
	
		var alertObject = {
            title: title,
            body: string
        };

        Adapt.once("notify:closed", function() {
            Adapt.trigger("tutor:closed");
        });

        Adapt.trigger('notify:popup', alertObject);

        Adapt.trigger('tutor:opened');
    }

  }, Backbone.Events);
  
  licencePage.initialize();

  return (licencePage);
});