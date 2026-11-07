# Sprawozdanie - Laboratorium 1

**Przedmiot:** Budowa aplikacji mobilnych z użyciem technologii frontendowych  
**Student / identyfikator:** Dawid Wiśniewski, 147766  
**Projekt biznesowy:** MOB-009 - SavingsGoals  
**Framework:** React Native (Expo)  
**Data zajęć:** 2026-10-18  
**Repozytorium:** https://github.com/dwisniewski299/WSB_Budowa_aplikacji_mobilnych  
**Commit / tag odpowiadający oddaniu:** tag `lab-01`

## 1. Cel laboratorium

Celem było wybranie frameworka do projektu MOB-009, przygotowanie środowiska, uruchomienie szkieletu aplikacji na telefonie z Androidem oraz zorganizowanie pracy w Git (Issue, gałąź, Pull Request). Rezultat: porównanie trzech frameworków, decyzja ADR, działająca aplikacja z ekranem "MOB-009 - SavingsGoals", README z instrukcją uruchomienia i scalony Pull Request.

## 2. Analiza technologii

**Dokument:** `docs/technology-comparison.md`  
**Najważniejsze różnice:** React Native i NativeScript używają JavaScript lub TypeScript, a Flutter języka Dart. React Native i NativeScript wyświetlają natywne kontrolki platformy, a Flutter rysuje cały interfejs własnym silnikiem. NativeScript daje bezpośredni dostęp do natywnych API z kodu JS, a w React Native i Flutterze korzysta się zwykle z gotowych modułów. Expo Go pozwala uruchomić aplikację React Native na telefonie bez instalacji Android SDK. Wszystkie trzy technologie mają narzędzia do testów jednostkowych (Jest, flutter_test, Karma).  
**Źródła:** oficjalna dokumentacja reactnative.dev, docs.expo.dev, docs.flutter.dev, docs.nativescript.org (data dostępu 2026-11-07), pełna lista w `docs/technology-comparison.md`.

## 3. Decyzja technologiczna

**Dokument:** `docs/technology-decision.md`  
**Wymagania karty MOB-009 wpływające na wybór:**

1. MOB-009-FR-11 (trwały zapis lokalny): potrzebna biblioteka zapisu działająca w Expo Go bez konfiguracji natywnej, np. AsyncStorage lub expo-sqlite.
2. MOB-009-FR-10 i MOB-009-BR-02 (postęp = suma wpłat / kwota docelowa × 100%): logika w zwykłych funkcjach JS, łatwa do testów w Jest. Kwoty będą przechowywane w groszach jako liczby całkowite.
3. MOB-009-FR-04 do FR-07 (lista, szczegóły, formularz, wyszukiwanie, filtrowanie, sortowanie): gotowe komponenty `FlatList` i `TextInput` oraz biblioteki nawigacji.

**Dlaczego wybrano framework:** szybkie uruchomienie na telefonie przez Expo Go, testowalna logika w Jest, jeden język dla interfejsu i logiki, gotowe biblioteki zapisu lokalnego.  
**Rozważona alternatywa:** Flutter. Ma wbudowane testy i identyczny wygląd na wszystkich platformach, ale wymaga nauki Darta oraz instalacji Flutter SDK i Android SDK.  
**Ryzyka:**
1. Liczby w JS są typu float, dlatego kwoty będą przechowywane w groszach.
2. Expo SDK szybko się zmienia, a Expo Go obsługuje tylko najnowszy SDK. Wersje są zapisane w `package-lock.json` i README.
3. Expo Go obsługuje tylko moduły z Expo SDK.

## 4. Konfiguracja środowiska

| Narzędzie | Wersja | Rola |
|---|---|---|
| System operacyjny | Windows 11 Home | Komputer do pracy |
| Framework / SDK | Expo SDK 58 (`expo` 58.0.23), React Native 0.88.1, React 19.3.0 | Framework aplikacji |
| Runtime / menedżer pakietów | Node.js 24.12.0, npm 11.6.2 | Uruchamianie narzędzi i instalacja bibliotek |
| Emulator / urządzenie | Realme 9 (RMX3521), Android 14, Expo Go (SDK 58.0.0) | Uruchamianie aplikacji |
| Edytor / IDE | Visual Studio Code | Edycja kodu i dokumentacji |
| Kontrola wersji | Git 2.55.0 | Historia zmian i praca z GitHub |

**Polecenia uruchomienia:**

```text
git clone https://github.com/dwisniewski299/WSB_Budowa_aplikacji_mobilnych.git SavingsGoals
cd SavingsGoals
npm install
npx expo start
```

Szczegóły w `README.md`.

**Wynik uruchomienia:** aplikacja uruchomiła się na telefonie Realme 9 w Expo Go po zeskanowaniu kodu QR. Zrzut ekranu: [docs/screenshots/initial-screen.jpg](../docs/screenshots/initial-screen.jpg)  
**Weryfikacja po zmianie ekranu:** domyślny tekst szablonu "Open up App.js to start working on your app!" zmieniono w `src/App.js` na "MOB-009 - SavingsGoals". Po ponownym uruchomieniu na telefonie wyświetlał się nowy tekst. Po scaleniu PR aplikację uruchomiono jeszcze raz z gałęzi `main` i tekst był poprawny.

## 5. Praca z Git

- **Issue:** [#1 feature: Przygotowanie środowiska i ekranu startowego](https://github.com/dwisniewski299/WSB_Budowa_aplikacji_mobilnych/issues/1)
- **Gałąź:** `feature/initial-screen`
- **Pull Request:** [#2 feat: customize initial screen](https://github.com/dwisniewski299/WSB_Budowa_aplikacji_mobilnych/pull/2)
- **Commit(y):**
  - [f950199](https://github.com/dwisniewski299/WSB_Budowa_aplikacji_mobilnych/commit/f950199) chore: initialize mobile project
  - [6b6d864](https://github.com/dwisniewski299/WSB_Budowa_aplikacji_mobilnych/commit/6b6d864) feat: customize initial screen
  - [af5278b](https://github.com/dwisniewski299/WSB_Budowa_aplikacji_mobilnych/commit/af5278b) docs: rename initial screen screenshot
  - [a498daa](https://github.com/dwisniewski299/WSB_Budowa_aplikacji_mobilnych/commit/a498daa) Merge pull request #2 from dwisniewski299/feature/initial-screen
- **Samoocena PR:** sprawdzono zmiany w zakładce Files changed: zmieniona 1 linia w `src/App.js` i dodany zrzut ekranu. Brak zbędnego kodu, sekretów i danych osobowych. Aplikację uruchomiono przed utworzeniem PR.
- **Stan `main` po scaleniu:** `main` zawiera merge commit `a498daa`, Issue #1 zamknął się automatycznie dzięki "Closes #1", a aplikacja uruchomiona z `main` pokazuje "MOB-009 - SavingsGoals".

## 6. Dyskusja

**Wybór technologii dla scenariusza zespołu:** React Native (z Expo)  
**Dwa argumenty:** (1) zespół zna TypeScript i React, więc może od razu pisać kod bez nauki nowego języka, co ma znaczenie przy sześciu miesiącach i ograniczonym budżecie; (2) Expo SDK ma gotowe moduły aparatu (expo-camera), lokalizacji (expo-location) i zapisu lokalnego (expo-sqlite), co zmniejsza ryzyko integracji natywnych.  
**Największe ryzyko:** utrzymanie przez dwa lata. Częste aktualizacje React Native i Expo mogą wymagać zmian w kodzie i bibliotekach.  
**Co mogłoby zmienić decyzję:** potrzeba funkcji natywnej bez gotowego modułu albo zespół znający Darta. Wtedy lepszym wyborem mógłby być Flutter.

## 7. Problemy i rozwiązania

| Problem / objaw | Hipoteza przyczyny | Działanie | Wynik |
|---|---|---|---|
| `git push` kończył się błędem 403 "Permission denied" | W systemie zapisane było logowanie do innego konta GitHub bez dostępu do repozytorium | Wylogowanie tego konta poleceniem `git credential-manager github logout` i ponowne logowanie na koncie właściciela repozytorium | Push zakończył się sukcesem |
| Zrzut ekranu zapisał się jako plik `.jfif` z losową nazwą | Format i nazwa nadane przy przenoszeniu zrzutu z telefonu na komputer | Zmiana nazwy poleceniem `git mv` na `initial-screen.jpg` w osobnym commicie | Czytelna nazwa i poprawny podgląd na GitHubie |
| Ostrzeżenia `LF will be replaced by CRLF` przy `git add` | Różne znaki końca linii w Windows i w plikach szablonu | Sprawdzenie, że to tylko informacja Git | Brak wpływu na działanie aplikacji |

## 8. Wnioski

1. React Native z Expo pozwala uruchomić aplikację na telefonie przez Expo Go bez instalacji Android Studio, co mocno skraca przygotowanie środowiska.
2. Nietrafne okazało się założenie, że `git push` sam poprosi o logowanie. Git użył konta zapisanego wcześniej w systemie, dlatego przed pushem warto sprawdzić, na jakie konto jest zalogowany.
3. Przed laboratorium 2 trzeba zaplanować model danych (cel oszczędnościowy i wpłata), nawigację między ekranami i sposób zapisu lokalnego.

## 9. Checklista oddania

- [x] Porównanie trzech frameworków.
- [x] ADR wyboru technologii.
- [x] Uruchomiona aplikacja i instrukcja w README.
- [x] Issue, gałąź i scalony PR.
- [x] Linki do dowodów i historia pracy.
- [x] Problemy i wnioski.
