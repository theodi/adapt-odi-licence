define([
  'coreJS/adapt',
], function(Adapt) {

    var licencePage = _.extend({
  
    initialize: function() {
    	this.listenTo(Adapt, 'licencePage:showLicencePage', this.showLicencePage);
    	this.listenTo(Adapt, 'router:course', this.updateCourse);
    },

    updateCourse: function(target) {
    	this.currentCourse = target;
    },

    getCourse: function() {
    	return this.currentCourse;
    },

    getCertificate: function() {
	string = "<div class='licencePageGraphicElement'><img class='licencePageGraphic' src='adapt/css/assets/badge.png'/></div>";
	string += "<div class='licencePageText'>";
	string += "<ul class='open-data-certificate-details'> <li> <span>Open: ODI eLearning Data</span> </li> <li> <span>Pilot Open Data Certificate (final)</span> </li> <li> <span>Active - self certified</span> </li> </ul>";
	string += "<hr class='licencePageRule'/>";
	return string;
    },
    
    getLicence: function(licence) {
	if (licence == "CC-BY 4.0" ) {
		url = "https://licensebuttons.net/l/by/4.0/88x31.png";
		detail = "<span xmlns:dct='http://purl.org/dc/terms/' property='dct:title'>Learning open data</span> by <span xmlns:cc='http://creativecommons.org/ns# property='cc:attributionName'>Open Data Institute</span> is licensed under a Creative Commons Attribution 4.0 International License";
	}
	if (licence == "CC-BY-SA 4.0" ) {
		url = "https://licensebuttons.net/l/by-sa/4.0/88x31.png";
		detail = "<span xmlns:dct='http://purl.org/dc/terms/' property='dct:title'>Learning open data</span> by <span xmlns:cc='http://creativecommons.org/ns# property='cc:attributionName'>Open Data Institute</span> is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License";
	}
	string = "<div class='licencePageGraphicElement'><img class='licencePageGraphic' src='"+url+"'/></div>";
	string += "<div class='licencePageText'>";
	string += "<h2>Licence details</h2>";
	string += detail;
	string += "<h2>Content usage</h2>";
	string += "<p>The content, including text and structure is available for you to <em>use</em>, <em>reuse</em> and <em>share</em> (including for commercial purposes) subject to the conditions of the license above.</p>";
	string += "<h2>Exclusions</h2>";
	string += "<p>This license does not cover: <ul><li>Logos and trade marks belonging to the Open Data Institute</li><li>Third party content (such as images)</li></ul></p>";
	string += "<h2>Non-endiresement</h2>";
	string += "<p>This licence does not grant you any right to use the Information in a way that suggests any official status or that the Information Provider and/or Licensor endorse you or your use of the Information.</p>";
	string += "<h2>No warrenty</h2>";
	string += "<p>The Information is licensed 'as is'. The Open Data Institute is not liable for any errors or omissions in the Information and shall not be liable for any loss, injury or damage of any kind caused by its use. The Information Provider does not guarantee the continued supply of the Information.</p>";
	
	string += "<hr class='licencePageRule'/>";
	return string;	
    },

    showLicencePage: function() {
    	licence = Adapt.config.get('_licencePage').licence;
	string = getCertificate();
	string += getLicence(licence);
	
	var alertObject = {
            title: "About",
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
