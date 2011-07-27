var data = [
   {
      "release": "Nat Welch 2.3.5-europe",
      "img": "img/235europe.jpg",
      "changes" : [
         "I completed a one month trip to Europe. During this trip I visited the UK, including the towns of London, Edinburgh, Glasgow, York and Harrogate. I also visited Paris, France on this trip and was able to meet up with both my Family and Shawn Tice while traveling.",
         "I was hired by Punchd Labs Inc., which was subsequently acquired by Google. I start working at Google on August 8th.",
         "I graduated College with a B.S. in Computer Science at the California Polytechnic State University in San Luis Obispo, California. I commenced on June 11th, 2011.",
         "I quit working for iFixit.com after two years in April. This was a tough choice, but am looking forward to the future.",
      ],
   },
   {
      "release" : "Nat Welch 2.3",
      "changes" : [
      ]
   },
   {
      "release" : "Nat Welch 2.2",
      "img" : "img/22.jpg",
      "changes" : [
      ]
   },
   {
      "release" : "Nat Welch 2.1",
      "changes" : [
      ]
   },
   {
      "release" : "Nat Welch 2.0",
      "changes" : [
      ]
   },
   {
      "release": "Nat Welch 1.9",
      "changes": [
         "I graduated highschool on June 9th, 2006 from Maria Carillo High School in Santa Rosa, CA.",
         "I attended BFD, an all day festival in Mountain View, CA, to celebrate with my friend Chris Harsch.",
         "I started college at Cal Poly."
      ]
   },
   {
      "release" : "Nat Welch 0.5",
      "changes" : [
         "Moved into 1227 St. Matthew Way, Los Altos, CA.",
         "Began Kindergarten at Montclaire Elementary School."
      ]
   },
   {
      "release" : "Nat Welch 0.1",
      "img": "img/1.jpg",
      "changes" : [
      ]
   },
   {
      "release" : "Nat Welch 0.0",
      "changes" : [
         "Project Init on Feburary 22nd, 1988."
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
