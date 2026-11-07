# Porównanie technologii: React Native, Flutter, NativeScript

Projekt: MOB-009 - SavingsGoals
Data dostępu do źródeł: 2026-11-07

Oznaczenia: **[F]** fakt potwierdzony w dokumentacji (źródło w nawiasie), **[O]** własna ocena.

## Tabela porównawcza

| Kryterium | React Native | Flutter | NativeScript |
|---|---|---|---|
| 1. Język | JavaScript lub TypeScript, biblioteka React **[F]** [1] | Dart **[F]** [6] | JavaScript lub TypeScript, do wyboru Angular, Vue, React, Svelte, Solid lub czysty JS **[F]** [10] |
| 2. Tworzenie i renderowanie UI | Komponenty React są zamieniane na natywne widoki platformy (np. `View` to `android.view.View` na Androidzie) **[F]** [1][2] | Własny silnik renderuje każdy piksel, UI składa się z widgetów Fluttera, a nie z natywnych kontrolek **[F]** [6] | Natywne widoki platformy tworzone z poziomu JS **[F]** [10] |
| 3. Dostęp do natywnych API | Moduły natywne (Kotlin/Java, Swift/Obj-C) wywoływane z JS; w Expo gotowe moduły SDK **[F]** [3][5] | Platform channels lub FFI, pakiety z pub.dev **[F]** [7] | Bezpośrednie wywołania natywnych klas z JS dzięki marshallingowi, bez pisania wrappera **[F]** [11] |
| 4. Wsparcie Android/iOS | Android i iOS **[F]** [1] | Android, iOS, a także web i desktop **[F]** [6] | Android i iOS **[F]** [10] |
| 5. Narzędzia | Metro, Expo CLI, aplikacja Expo Go na telefonie, React Native DevTools **[F]** [4][5] | `flutter` CLI, Flutter DevTools, hot reload **[F]** [6] | `ns` CLI, wymaga Android SDK do budowania **[F]** [13] |
| 6. Testowanie | Jest jako domyślne narzędzie testów jednostkowych, testy komponentów **[F]** [4] | Wbudowane testy jednostkowe, widgetów i integracyjne **[F]** [8] | Testy jednostkowe przez Karma z Jasmine, Mocha lub QUnit **[F]** [12] |
| 7. Ekosystem | Pakiety npm, bardzo duża społeczność **[O]** | Pakiety pub.dev, duża społeczność **[F]** [9] **[O]** | Mniejszy wybór gotowych pluginów (market.nativescript.org) **[O]** [14] |
| 8. Ograniczenia | Funkcja bez gotowego modułu wymaga kodu natywnego; Expo Go obsługuje tylko moduły z Expo SDK, inne wymagają development build **[F]** [5] | Nowy język Dart dla osób znających JS; UI nie wygląda automatycznie jak natywne kontrolki **[O]** | Mniej materiałów i przykładów, wolniejsze odpowiedzi na problemy **[O]** |
| 9. Próg wejścia dla tego projektu | Niski: Expo Go na telefonie bez instalacji Android Studio **[O]** | Średni: instalacja Flutter SDK i Android SDK **[O]** | Średni: instalacja Android SDK i JDK **[O]** |

## Krótkie uzasadnienia

1. **Język** - React Native i NativeScript używają JS/TS, więc logikę biznesową można pisać tym samym językiem co UI. Flutter wymaga nauki Darta.
2. **UI** - React Native i NativeScript korzystają z natywnych kontrolek. Flutter rysuje wszystko sam, dzięki czemu wygląd jest identyczny na każdej platformie.
3. **Natywne API** - NativeScript daje najszerszy bezpośredni dostęp. W React Native i Flutterze zwykle korzysta się z gotowych modułów lub pisze własne.
4. **Platformy** - wszystkie trzy wspierają Android i iOS. iOS wymaga macOS do budowania w każdej z nich.
5. **Narzędzia** - Expo Go pozwala uruchomić aplikację na telefonie przez kod QR, co skraca konfigurację.
6. **Testy** - logikę w JS/TS testuje się w Jest bez urządzenia, co dobrze pasuje do CI na Linuxie.
7. **Ekosystem** - liczba pakietów nie jest jedynym kryterium, ważna jest też jakość i utrzymanie bibliotek.
8. **Ograniczenia** - przy prostej aplikacji CRUD bez aparatu i GPS ograniczenia React Native z Expo nie blokują wymagań.

## Pytania kontrolne

1. **Dlaczego React Native nie jest tym samym co aplikacja webowa w WebView?**
   React Native nie używa HTML ani DOM. Kod JS działa w silniku JS (Hermes), a komponenty są zamieniane na prawdziwe natywne widoki Androida i iOS. WebView tylko wyświetla stronę internetową wewnątrz aplikacji.

2. **Czym różni się podejście Fluttera do interfejsu od React Native?**
   Flutter rysuje cały interfejs własnym silnikiem graficznym z widgetów Fluttera. React Native przekazuje opis UI do platformy, która wyświetla swoje natywne kontrolki.

3. **Co oznacza dostęp do natywnego API w NativeScript?**
   Kod JS/TS może bezpośrednio tworzyć i wywoływać natywne klasy Androida (Java/Kotlin) i iOS (Obj-C/Swift), np. `new android.widget.Button(context)`. NativeScript sam konwertuje typy (marshalling), więc nie trzeba pisać pluginu.

4. **Dlaczego liczba pobrań biblioteki nie wystarcza do oceny ryzyka technologicznego?**
   Pobrania mogą pochodzić z automatycznych buildów CI i zależności pośrednich. Nie mówią nic o tym, czy biblioteka jest aktualizowana, ilu ma opiekunów, jak szybko naprawiane są błędy, jaką ma licencję i czy działa z nowymi wersjami frameworka.

## Źródła

1. React Native - Core Components and Native Components: https://reactnative.dev/docs/intro-react-native-components
2. React Native - Architecture Overview: https://reactnative.dev/architecture/overview
3. React Native - Native Platform: https://reactnative.dev/docs/native-platform
4. React Native - Testing: https://reactnative.dev/docs/testing-overview
5. Expo - Create a project i Development builds: https://docs.expo.dev/get-started/create-a-project/ , https://docs.expo.dev/develop/development-builds/introduction/
6. Flutter - Architectural overview: https://docs.flutter.dev/resources/architectural-overview
7. Flutter - Platform channels: https://docs.flutter.dev/platform-integration/platform-channels
8. Flutter - Testing: https://docs.flutter.dev/testing/overview
9. pub.dev: https://pub.dev
10. NativeScript - dokumentacja: https://docs.nativescript.org/
11. NativeScript - Marshalling: https://docs.nativescript.org/guide/marshalling
12. NativeScript - Testing: https://docs.nativescript.org/guide/testing
13. NativeScript - Setup: https://docs.nativescript.org/setup/
14. NativeScript Marketplace: https://market.nativescript.org/
