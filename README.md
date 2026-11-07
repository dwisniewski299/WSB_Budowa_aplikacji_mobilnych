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
| Expo Go | SDK 58.0.0, z Google Play |
| Edytor | Visual Studio Code |

Platforma docelowa: Android (telefon z aplikacją Expo Go). Testowane na: Realme 9 (RMX3521), Android 14.

## Struktura projektu

| Element | Zawartość |
|---|---|
| `src/` | Kod aplikacji |
| `assets/` | Ikony i grafiki aplikacji |
| `docs/` | Dokumentacja techniczna |
| `docs/screenshots/` | Zrzuty ekranu aplikacji |
| `reports/` | Sprawozdania z laboratoriów |
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

- Szkielet aplikacji Expo uruchamiany na Androidzie, z ekranem startowym "MOB-009 - SavingsGoals".

## Znane ograniczenia

- Aplikacja nie ma jeszcze funkcji CRUD, są planowane w kolejnych laboratoriach.
- Uruchamianie tylko przez Expo Go, bez osobnego pliku APK.
- iOS nie był testowany (brak urządzenia i macOS).

## Użycie AI

Asystent AI (Claude Code) był wykorzystywany pomocniczo przy:

- połączeniu aplikacji z telefonem przez Expo Go i wygenerowaniu kodu QR,
- redagowaniu, poprawie i weryfikacji dokumentacji (zgodność z aktualnym stanem projektu),
- ustalaniu przyczyn błędów podczas wysyłania zmian do GitHub.
