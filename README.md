# SavingsGoals (MOB-009)

Aplikacja mobilna do śledzenia oszczędzania na cele. Użytkownik tworzy cele oszczędnościowe i dodaje do nich wpłaty, a aplikacja liczy postęp: suma wpłat / kwota docelowa × 100%.

Karta biznesowa: [business-requirements_9.md](business-requirements_9.md)
Wymagania wspólne: [requirements.md](requirements.md), zasady pracy: [CONTRIBUTING.md](CONTRIBUTING.md)

## Technologia

React Native z Expo (szablon `blank`, JavaScript). Uzasadnienie: [docs/technology-decision.md](docs/technology-decision.md), porównanie: [docs/technology-comparison.md](docs/technology-comparison.md).

| Narzędzie | Wersja |
|---|---|
| System | Windows 11 Home |
| Node.js | 24.12.0 |
| npm | 11.6.2 |
| Git | 2.55.0 |
| Expo SDK | 58 (`expo` 58.0.23) |
| React Native | 0.88.1 |
| React | 19.3.0 |
| React Navigation | 7.5.1 (`native-stack` 7.21.0) |
| expo-sqlite | 58.0.15 |
| expo-crypto | 58.0.7 |
| Expo Go | SDK 58.0.0, z Google Play |
| Edytor | Visual Studio Code |

Platforma docelowa: Android (telefon z aplikacją Expo Go). Testowane na: Realme 9 (RMX3521), Android 14.

## Struktura projektu

| Element | Zawartość |
|---|---|
| `src/App.js` | Start aplikacji i nawigacja |
| `src/screens/` | Ekrany aplikacji |
| `src/components/` | Wspólne komponenty interfejsu |
| `src/logic/` | Walidacja i operacje na kwotach |
| `src/data/` | Baza SQLite i repozytorium danych |
| `assets/` | Ikony i grafiki aplikacji |
| `docs/` | Dokumentacja techniczna, w tym [architektura](docs/architecture.md) |
| `docs/screenshots/` | Zrzut ekranu z Lab 1 |
| `reports/` | Sprawozdania z laboratoriów |
| `reports/assets/` | Zrzuty ekranu do sprawozdań |
| `app.json` | Ustawienia aplikacji Expo |
| `package.json` | Lista bibliotek i skrypty |
| `package-lock.json` | Dokładne wersje bibliotek |
| `requirements.md` | Wymagania wspólne projektu |
| `CONTRIBUTING.md` | Zasady pracy z Git |
| `business-requirements_9.md` | Karta biznesowa MOB-009 |

## Wymagania

- Node.js 24 i npm
- Git
- Telefon z Androidem i aplikacją Expo Go z Google Play
- Komputer i telefon w tej samej sieci Wi-Fi

## Instalacja

```bash
git clone https://github.com/dwisniewski299/WSB_Budowa_aplikacji_mobilnych.git SavingsGoals
cd SavingsGoals
npm install
```

## Uruchomienie

```bash
npx expo start
```

Zeskanuj kod QR z terminala w aplikacji Expo Go. Jeśli telefon nie łączy się z komputerem, uruchom:

```bash
npx expo start --tunnel
```

## Testy

Testy automatyczne zostaną dodane w kolejnych laboratoriach.

## Zrealizowane funkcje

- Lista celów oszczędnościowych z komunikatem pustej listy.
- Dodawanie celu z walidacją nazwy, kwoty docelowej i terminu.
- Szczegóły celu z listą jego wpłat.
- Dodawanie wpłaty do wybranego celu z walidacją kwoty i daty.
- Trwały zapis w lokalnej bazie SQLite, dane zostają po ponownym uruchomieniu.
- Blokada usunięcia celu z wpłatami na poziomie bazy (klucz obcy).

## Znane ograniczenia

- Brak edycji i usuwania, wyszukiwania, filtrowania, sortowania z wyborem kierunku i postępu celu. Są planowane w kolejnych laboratoriach.
- Daty wpisuje się ręcznie w formacie RRRR-MM-DD.
- Uruchamianie tylko przez Expo Go, bez osobnego pliku APK.
- iOS nie był testowany (brak urządzenia i macOS).

## Użycie AI

Asystent AI (Claude Code) był wykorzystywany pomocniczo przy:

- redagowaniu i weryfikacji dokumentacji (zgodność z aktualnym stanem projektu),
- ustalaniu przyczyn błędów podczas wysyłania zmian do GitHub,
- sprawdzaniu, czy zmiany trafiają na właściwe gałęzie i poprawnie do gałęzi main,
- szukaniu przyczyn błędów w działaniu aplikacji, np. niewidocznego paska stanu.