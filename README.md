# Frontend for etablert tilsyn

Dette er en frontend for "etablert tilsyn" i saksbehandlingen av pleiepenger ved sykt barn.

## Komme i gang

For å kjøre frontend-appen i utvikling, kjør `yarn` etterfulgt av `yarn dev` på rot av prosjektet.

Utviklingsmiljøet er konfigurert opp med en egen webpack-konfig som hoster `index.html` som ligger på rot.
Denne index-filen er kun ment for utvikling.

For enkelthet i utvikling ligger det et eget mockup-api under `/mock` som server mockede data, og som
`index.html` på rot by default konfigurerer frontenden til å gjøre sine api-kall mot. Mockup-apiet kjøres
opp ved å kjøre `yarn api-mock` på rot av prosjektet.

### Kjøring av tester

`yarn test` på rot av prosjektet

### Bygging av appen

`yarn build` på rot av prosjektet

Denne kommandoen vil se på `version` spesifisert i `package.json`, opprette en ny katalog under `build`
som samsvarer med det versjonsnummeret, og legge de bygde filene der.

### Kjøring av bygg

`yarn start` kjører opp en server som statisk hoster innholdet under `build`

---

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub

### For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #sif_pleiepenger.
