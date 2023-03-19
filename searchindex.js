// search index for WYSIWYG Web Builder
var database_length = 0;

function SearchPage(url, title, keywords, description)
{
   this.url = url;
   this.title = title;
   this.keywords = keywords;
   this.description = description;
   return this;
}

function SearchDatabase()
{
   database_length = 0;
   this[database_length++] = new SearchPage("index.html", "Gogle - Разносторонний сайт!", "Главная  Все о Gogle  Блог Обновлений  Скачать исходный код сайта от 13.11.2022  Желтый баннер  БЕТА КОНТЕНТ  НАСТРОЙКИ  © Konalobo Studio 2022-2023  Россия  Все о Gogle, Наш чат, баннер и прочее  •  Следите за Sneak Peak обновлениями здесь!  Ваш аккаунт  Убрать код страны  Gogle также доступен на English!  Хотите понастольгировать по старому дизайну YouTube? Небольшой уголок ностальгии ждет вас тут Это ресоздание моего канала в стиле Hitchhiker, который был на YouTube c конца 2012 по 2020 годы  Тут есть все ссылки на меня в других соц сетях Можете идти за вопросами туда     Для настоящих ценителей ретро это ресоздание моего канала в стиле YouTube Cosmic Panda который использовался в 2012 году Интересный факт  именно с этой страницы и начался проект Gogle  см WebArchive   Внешний сайт Помните эффект змейки в Windows XP когда программа зависала? Тут вы можете вспомнить этот эффект Также можно выбрать несколько окон и рисовать ими  Тут вы можете послушать и скачать саундтрек Pixel Gun 3D, Галилео или мои треки  Мои и не только проекты видео Просто нажмите на кнопку скачивания и скачайте проект Также кнопка скачивания покажет вам версию Sony Vegas которая откроет файл  В БЕТЕ  Вики моего собственного сериала Отсюда вы узнаете все про персонажей, локации и серии  Все про классический Skype Моды со старыми звуковыми эффектами, маленький архивчик со старыми версиями, другие файлы  \"ДОБРО ПОЖАЛОВАТЬ в ностальгичную коллекцию старых  и не совсем  версий игры Pixel Gun 3D\"  Все про старый Pixel Gun 3D Описывать тут много, поэтому рекомендую ознакомиться  Я также делаю моды и аддоны на Minecraft Bedrock Есть много интересных и забавных паков  Если вы играете в Pixel Gun 3D, то вы знаете канал Pixel Gun Music Его создатель, Yolopix, сделал JS визуализатор треков Просто загрузите трек, фото и наслаждайтесь визуализатором  Старая версия сайта  В Центре загрузок вы можете скачать много интересного Разные программы, файлы и прочее   ", "");
   this[database_length++] = new SearchPage("blog.htm", "Блог", "       ", "");
   this[database_length++] = new SearchPage("vegfilesold/vegfiles.html", "VEG FILE COLLECTION", "                     ", "");
   this[database_length++] = new SearchPage("classicskype/classicskype.html", "Classic Skype", "               ", "");
   this[database_length++] = new SearchPage("classicskype/page1.html", "WWB Template 10", "                   ", "");
   this[database_length++] = new SearchPage("konamusic/konamusic-0LD.htm", "Музыка Конаты", "                                                                                     ", "");
   this[database_length++] = new SearchPage("konamusic/index.html", "Untitled Page", "Copyright © 2022-2023 by \"KonaloboStudio\"  ·  E-Mail  thesonicrus@gmail.com  Konalobo's Music   ", "");
   this[database_length++] = new SearchPage("konamusic/iframe/index.html", "Untitled Page", "Добро пожаловать  Это раздел с моей  и не только  музыкой  Куда мне зайти  В разделе \"Мои треки\" можно послушать и скачать мою собственную музыку  Другие треки  У нас также доступны треки из Галилео и Pixel Gun 3D Скоро мы добавим больше треков  Расходники для проектов  Вы также можете скачать составляющие моих проектов, если я туда что то опубликую   ", "");
   this[database_length++] = new SearchPage("konamusic/iframe/project.html", "Untitled Page", " ", "");
   this[database_length++] = new SearchPage("konamusic/iframe/other.html", "Untitled Page", "Временно не готово   ", "");
   this[database_length++] = new SearchPage("konamusic/iframe/music.html", "Untitled Page", "Reduce самый первый нормальный трек в FL Studio Mobile  Megolodon довольно неплохой трек в FLM  Pixel Lands не доделан тут я изучал LMMS  OneFall Почему то этот трек напоминает мне какие то песни времен 2012-2014  Airhax Первый трек созданный в ПК версии FL Studio Сторонних  плагинов не использовалось   ", "");
   this[database_length++] = new SearchPage("youtab13/youtab13.html", "Konalobo Studio - YouTab 2013", "                                                                                                   ", "");
   this[database_length++] = new SearchPage("youtab13/about_youtab13.html", "About - YouTab 2013", "                       ", "");
   this[database_length++] = new SearchPage("youtab13/page2.html", "About YouTab 2013", "           ", "");
   this[database_length++] = new SearchPage("about_gogle/index.htm", "Все о Gogle", "                                               ", "");
   this[database_length++] = new SearchPage("404/404.htm", "404", "   ", "");
   this[database_length++] = new SearchPage("sosiskatime/index.htm", "Безымянная страница", "                             ", "");
   this[database_length++] = new SearchPage("sosiskatime/pers/shablon.htm", "Безымянная страница", "                         ", "");
   this[database_length++] = new SearchPage("sosiskatime/pers/sosiska.htm", "Безымянная страница", "                           ", "");
   this[database_length++] = new SearchPage("pixelgun3dold/index.htm", "Pixel Gun Collection (rus)", "                                                                                                 ", "");
   this[database_length++] = new SearchPage("pixelgun3dold/underconstruct.htm", "Скоро...", "       ", "");
   this[database_length++] = new SearchPage("pixelgun3dold/underconstuct2/index.htm", "UnderConstruction", "       ", "");
   this[database_length++] = new SearchPage("pixelgun3dold/index_en.htm", "Pixel Gun Collection (rus)", "                                                                                           ", "");
   this[database_length++] = new SearchPage("pixelgun3dold/index_en_undconst/index_en.htm", "Untitled Page", "   ", "");
   this[database_length++] = new SearchPage("pixelgun3d/index.htm", "Главная - Pixel Gun 3D Collection", "                           ", "");
   this[database_length++] = new SearchPage("pixelgun3d/downloads.htm", "Загрузки - Pixel Gun 3D Collection", "                                               ", "");
   this[database_length++] = new SearchPage("pixelgun3d/save.htm", "Сэйв - Pixel Gun 3D Collection", "                   ", "");
   this[database_length++] = new SearchPage("pixelgun3d/photo.htm", "Фото - Pixel Gun 3D Collection", "                 ", "");
   this[database_length++] = new SearchPage("pixelgun3d/video.htm", "Видео - Pixel Gun 3D Collection", "                           ", "");
   this[database_length++] = new SearchPage("pixelgun3d/tutor.htm", "Туториалы - Pixel Gun 3D Collectiion", "                 ", "");
   this[database_length++] = new SearchPage("pixelgun3d/missing.htm", "Поиск - Pixel Gun 3D Collection", "                         ", "");
   this[database_length++] = new SearchPage("pixelgun3d/contacts.htm", "Контакты - Pixel Gun 3D Collection", "                     ", "");
   this[database_length++] = new SearchPage("pixelgun3d/en/index.htm", "Home - Pixel Gun 3D Collection", "                           ", "");
   this[database_length++] = new SearchPage("pixelgun3d/en/downloads.htm", "Downloads - Pixel Gun 3D Collection", "                                               ", "");
   this[database_length++] = new SearchPage("pixelgun3d/en/save.htm", "Save - Pixel Gun 3D Collection", "                   ", "");
   this[database_length++] = new SearchPage("pixelgun3d/en/photo.htm", "Photos - Pixel Gun 3D Collection", "                 ", "");
   this[database_length++] = new SearchPage("pixelgun3d/en/video.htm", "Videos - Pixel Gun 3D Collection", "                           ", "");
   this[database_length++] = new SearchPage("pixelgun3d/en/tutor.htm", "Tutorials - Pixel Gun 3D Collectiion", "                 ", "");
   this[database_length++] = new SearchPage("pixelgun3d/en/missing.htm", "Missing - Pixel Gun 3D Collection", "                         ", "");
   this[database_length++] = new SearchPage("pixelgun3d/en/contacts.htm", "Contacts - Pixel Gun 3D Collection", "                   ", "");
   this[database_length++] = new SearchPage("pixelgun3d/extra/why-not-new-website-design.html", "Untitled Page", "         ", "");
   this[database_length++] = new SearchPage("pixelgun3d/extra/why-not-new-website-design-en.html", "Untitled Page", "         ", "");
   this[database_length++] = new SearchPage("underconst_dec2022/index.html", "РЕКОНСТРУКЦИЯ", "             ", "");
   this[database_length++] = new SearchPage("underconst_dec2022/html-письмо.html", "Untitled Page", "       ", "");
   this[database_length++] = new SearchPage("minerlands/index.html", "Untitled Page", "     ", "");
   this[database_length++] = new SearchPage("minerlands/list.html", "Untitled Page", "   ", "");
   this[database_length++] = new SearchPage("minerlands/addon/addonlist.html", "Untitled Page", "       ", "");
   this[database_length++] = new SearchPage("minerlands/addon/laptop.html", "Untitled Page", "             ", "");
   this[database_length++] = new SearchPage("minerlands/addon/shawerma.html", "Untitled Page", "         ", "");
   this[database_length++] = new SearchPage("minerlands/texturepacks/texturelist.html", "Untitled Page", "         ", "");
   this[database_length++] = new SearchPage("minerlands/texturepacks/fredjpig.html", "Untitled Page", "         ", "");
   this[database_length++] = new SearchPage("minerlands/texturepacks/sosiskablocks.html", "Untitled Page", "         ", "");
   this[database_length++] = new SearchPage("minerlands/texturepacks/openglfix.html", "Untitled Page", "         ", "");
   this[database_length++] = new SearchPage("about_gogle_old/about_gogle.htm", "О Gogle", "                     ", "");
   this[database_length++] = new SearchPage("good_links/index.html", "Untitled Page", "     ", "");
   this[database_length++] = new SearchPage("winxp/desktop.html", "Untitled Page", " ", "");
   this[database_length++] = new SearchPage("FOR-SHARARAM-EXTENDED/network-error.html", "Ошибка соединения!", "   ", "");
   this[database_length++] = new SearchPage("DOWNLOAD_CENTER/ind.html", "Центр загрузок - Gogle", "                                                                                                                                                       ", "");
   this[database_length++] = new SearchPage("konatube/index.html", "Untitled Page", " ", "");
   this[database_length++] = new SearchPage("konatube/watch/temp.html", "Untitled Page", " ", "");
   return this;
}
