--
-- Table structure for table `timeline`
--

CREATE TABLE `timeline` (
  `id` int(6) unsigned NOT NULL auto_increment,
  `type` enum('image','news','milestone') collate utf8_unicode_ci NOT NULL default 'news',
  `title` varchar(255) collate utf8_unicode_ci NOT NULL default '',
  `body` text collate utf8_unicode_ci NOT NULL,
  `date_event` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=11 ;

--
-- Dumping data for table `timeline`
--

INSERT INTO `timeline` VALUES(1, 'news', 'Introducing the all-new event timeline', 'This is a demo for a Tutorialzine tutorial. You can slide through all of the events on the timeline and click the ones you are interested in.\r\n\r\nThe timeline is dynamically build according to records in the MySQL database, so inserting new events is as easy as inserting a new row to the table.\r\n\r\nFeel free to leave your comments on the tutorial homepage (links are provided at the top and bottom of this demo).\r\n\r\nHave a great stay!', '2004-01-02');
INSERT INTO `timeline` VALUES(2, 'news', 'First meeting with venture capitalists', 'Soon after, our Company Co was founded!\r\n\r\nBe sure to check the rest of our company history in the time line :)', '2004-08-02');
INSERT INTO `timeline` VALUES(3, 'image', 'Started our famous Free Vacation With Every Purchase Campaign', 'img/machu-picchu.jpg', '2005-06-17');
INSERT INTO `timeline` VALUES(4, 'milestone', '2000 million in profits for the second quarter', 'For our main competitors.\r\n\r\nIt is not that bad for Company Co though, at least we moved to a bigger garage.', '2008-03-26');
INSERT INTO `timeline` VALUES(5, 'news', 'A huge upgrade to the servers', 'During a scheduled maintenance to the hardware, the engineering team discovered that the server farm has been powered by hamster wheels all along.\r\n\r\nThanks to their fast reactions and professionalism, additional hamster wheels where installed in order to accommodate the next generation of servers.', '2008-04-03');
INSERT INTO `timeline` VALUES(6, 'news', 'A Corporate organ donor campaign', 'The management team decided to start company-wide organ donation campaign.\r\n\r\nAll the employees are obliged to participate.\r\n\r\nIn typical managerial style, we have a deadline till the end of the month to deliver a liver, two hearts and four kidneys.', '2009-11-17');
INSERT INTO `timeline` VALUES(7, 'news', 'Petting zoo grand opening', 'Here at Company Co we love children. This is why we organized a free Petting zoo weekend at the park.\r\n\r\nHowever the company was having some financial difficulties, so we had to apply some restrictions.\r\n\r\nThe llamas were plush and our interface designer, John, was dressed as a panda.', '2010-01-02');
INSERT INTO `timeline` VALUES(8, 'news', 'Moving in', 'The company rented a garage right next to the one that Google started from.\r\n\r\nThe CEO is certain that this means guaranteed success.\r\n\r\nOnly if we could drive out the old Dodge that occupies the space inside. It smells funny.', '2004-09-03');
INSERT INTO `timeline` VALUES(9, 'image', 'The Company HQ', 'img/google_garage.jpg', '2004-10-25');
INSERT INTO `timeline` VALUES(10, 'news', 'Voted the startup with best support', 'A fantastic achievement given that our only tech support guy doesn''t speak English.\r\n\r\nGuess the other companies'' support is really bad.', '2005-09-14');
