# ADR-001: Wybór frameworka

Status: przyjęta
Data: 2026-11-07
Projekt: MOB-009 - SavingsGoals

## Kontekst i wymagania

Aplikacja służy do śledzenia oszczędzania na cele. Jedna osoba, dane lokalne, bez backendu. Wymagania karty MOB-009, które wpływają na wybór:

1. **MOB-009-FR-11, TECH-04 - trwały zapis lokalny.** Potrzebna jest gotowa i stabilna biblioteka do zapisu danych na telefonie, działająca bez dodatkowej konfiguracji natywnej.
2. **MOB-009-FR-10, MOB-009-BR-02 - obliczanie postępu i kwoty dziesiętne.** Logika (postęp, walidacja kwot) musi być prosta do napisania i przetestowania automatycznie, a kwoty nie mogą być przechowywane jako binarny float.
3. **MOB-009-FR-04 do FR-07 - lista, szczegóły, formularz, wyszukiwanie, filtrowanie, sortowanie.** Potrzebne są komponenty list, formularzy i nawigacja między ekranami.
4. **TEST-01, CI-01 - testy i CI.** Testy logiki muszą działać w GitHub Actions na Linuxie, bez macOS i bez emulatora.
5. Karta nie wymaga aparatu, GPS ani innych integracji sprzętowych.

Środowisko: Windows 11, brak zainstalowanego Android SDK.

## Rozważone alternatywy

1. **React Native z Expo** - JS, natywne kontrolki, uruchomienie na telefonie przez Expo Go.
2. **Flutter** - Dart, własny silnik renderowania, wbudowane testy.
3. **NativeScript** - odrzucony na wczesnym etapie. Jego główna zaleta (bezpośredni dostęp do natywnych API) nie jest potrzebna w tej karcie, a ekosystem jest mniejszy.

Szczegółowe porównanie: `docs/technology-comparison.md`.

## Decyzja

Wybieram **React Native z Expo** (szablon `blank`, JavaScript). Aplikacja jest uruchamiana na telefonie z Androidem w aplikacji Expo Go.

## Uzasadnienie (co najmniej 3 argumenty)

1. **Szybkie środowisko.** Expo Go uruchamia aplikację na telefonie przez kod QR, więc na Windows bez Android SDK można od razu pracować na prawdziwym urządzeniu (wymaganie TECH-02).
2. **Testowalna logika.** Obliczenie postępu i walidacje to zwykłe funkcje JS, które można testować w Jest bez telefonu. Jest jest domyślnym narzędziem testów w React Native, a testy łatwo uruchomić w CI na Linuxie (TEST-01, CI-01).
3. **Trwały zapis lokalny bez konfiguracji natywnej.** Biblioteki zapisu lokalnego (np. AsyncStorage, expo-sqlite) działają w Expo Go (FR-11).
4. **Gotowe komponenty list i formularzy.** `FlatList`, `TextInput` i biblioteki nawigacji pokrywają ekrany wymagane w FR-04 do FR-07.
5. **Jeden język.** UI i logika biznesowa w JavaScript, bez nauki Darta. Flutter dałby podobny efekt, ale większym kosztem startu.

## Konsekwencje i ryzyka (co najmniej 2)

1. **Liczby w JS są typu float.** Ryzyko błędów zaokrągleń przy kwotach. Rozwiązanie: kwoty przechowywane jako liczby całkowite w groszach i formatowane dopiero przy wyświetlaniu.
2. **Szybkie zmiany Expo SDK.** Expo Go ze sklepu obsługuje tylko najnowszy SDK. Rozwiązanie: wersje zapisane w `package-lock.json` i `README.md`.
3. **Ograniczenie Expo Go.** Biblioteka spoza Expo SDK wymagałaby development build i instalacji Android Studio. Rozwiązanie: używanie tylko bibliotek zgodnych z Expo Go.

## Warunki ponownego rozpatrzenia decyzji

- Pojawi się wymaganie funkcji natywnej bez modułu zgodnego z Expo.
- Aplikacja będzie miała wyraźne problemy z wydajnością list lub animacji.
- Wymagany będzie identyczny wygląd na wielu platformach (w tym desktop), wtedy lepszy może być Flutter.
