var data = [
   {
      "release": "Nat Welch 2.3.5-europe",
      "img": "img/235europe.jpg",
      "year": 2011,
      "changes" : [
         "I completed a one month trip to Europe. During this trip I visited the UK, including the towns of London, Edinburgh, Glasgow, York and Harrogate. I also visited Paris, France on this trip and was able to meet up with both my Family and Shawn Tice while traveling.",
         "I was hired by Punchd Labs Inc., which was subsequently acquired by Google. I start working at Google on August 8th.",
         "I graduated College with a B.S. in Computer Science at the California Polytechnic State University in San Luis Obispo, California. I commenced on June 11th, 2011.",
         "I quit working for iFixit.com after two years in April. This was a tough choice, but am looking forward to the future.",
      ],
   },
   {
      "release" : "Nat Welch 2.3",
      "year": 2011,
      "changes" : [
      ]
   },
   {
      "release" : "Nat Welch 2.2",
      "year": 2010,
      "img" : "img/22.jpg",
      "changes" : [
         "I started working at iFixit.com in April. Made a lot of awesome friends through the company."
      ]
   },
   {
      "release" : "Nat Welch 2.1",
      "year": 2009,
      "changes" : [
         "Moved into my first off campus housing on Southwood Dr. in San Luis Obispo, CA.",
         "I attended <abbr title=\"Penny Arcade Expo\">PAX</abbr> in Seattle, Washington with three of my friends Mark Gius, Dave Dagget and Chris Harsch.",
      ]
   },
   {
      "release" : "Nat Welch 2.0",
      "year": 2008,
      "changes" : [
         "Over the summer I traveled to China and visited Beijing, Shanghai, Xiao and ____.",
         "I attended <abbr title=\"Penny Arcade Expo\">PAX</abbr> in Seattle, Washington with my two friends Dave Dagget and Chris Harsch. We stayed with my wonderful cousin Becky and her husband Jeff.",
      ]
   },
   {
      "release": "Nat Welch 1.9",
      "year": 2007,
      "changes": [
         "I graduated highschool on June 9th, 2006 from Maria Carillo High School in Santa Rosa, CA.",
         "I attended BFD, an all day festival in Mountain View, CA, to celebrate with my friend Chris Harsch.",
         "I started college at Cal Poly."
      ]
   },
   {
      "release" : "Nat Welch 1.5",
      "year": 2003,
      "changes" : [
         "Moved into 3711 Skyfarm Rd. in Santa Rosa, CA.",
         "Began High School at Maria Carillo High School."
      ]
   },
   {
      "release" : "Nat Welch 0.5",
      "year": 1993,
      "changes" : [
         "Moved into 1227 St. Matthew Way, Los Altos, CA.",
         "Began Kindergarten at Montclaire Elementary School."
      ]
   },
   {
      "release" : "Nat Welch 0.1",
      "year": 1989,
      "img": "img/1.jpg",
      "changes" : [
      ]
   },
   {
      "release" : "Nat Welch 0.0",
      "year": 1988,
      "changes" : [
         "Project Init on Feburary 22nd, 1988. Initial maintainers Lydia Ann Dehn and David Cushman Welch. Birthed at Stanford Medical."
      ]
   },
];


// The actual javascript for the page.
window.addEvent('domready', function() {
   data.each(function (ev) {
      // Containing div for each release.
      var release = new Element('div', {class: 'release'});

      // img code.
      var img = null;
      if (ev.img != "") {
         var i = new Element('img', { src: ev.img });
         img = new Element('a', { href: ev.img });
         img.adopt(i);
      }

      // Unorded list of changes.
      var changeUl = new Element('ul', {class: 'changelist'});
      ev.changes.each(function(change) {
         changeUl.adopt(new Element('li', {html: change}));
      });

      // Insert release into page.
      release.adopt(img, new Element('h2', {html: ev.release}), changeUl);
      release.addClass('clearfix');
      $('data').adopt(release);
   });
});
