# WEATHER APP ☀️

Affichez la météo locale dans les transports en commun ! En français comme en anglais, mais aussi en système métrique ou impérial pour les voyageurs étrangers.

## 📓 CONTEXTE

Ce projet a été réalisé en individuel dans le cadre de la préparation à la journée de sélection pour le parcours de formation "Concepteur.trice Développeur.euse d’Application".

### Scénario fournit

    Votre agence a signé un contrat pour le développement d’interfaces météo à destination des usagers du réseau de transport en commun de plusieurs villes de taille moyenne en France. Les écrans seront intégrés aux écrans d’information dans les stations et dans les transports.

### Projet de départ

    https://github.com/madzadev/weather-app

## 🎯 FONCTIONNALITES

### Globales

- Données météo actualisées en fonction de la ville renseignée dans le fichier location.json
- Décompte de la dernière actualisation à la prochaine actualisation
- Changement du système métrique au système impérial et langue (français/anglais) toutes les 2 minutes
- Heure et date locale

### Données météo

- Températures
- Précipitations
- Vitesse et direction du vent

## 🛠 TECHNOLOGIES

### Front-end

- React.js
- HTML
- CSS

### Back-end

- Javascript
- API Forecast Open Meteo
- API Geocoding Open Meteo

## 🚀 INSTALLATION

1. Cloner le projet

   ```bash
       git clone git@github.com:kays-dev/test_weatherapp.git
       cd weather-app
   ```

2. Installer les dépendances node.js

   ```bash
       npm install
   ```

3. Installer l'environnement du projet

   ```bash
       cp .env.example .env.local
   ```

4. Lancer le projet

   ```bash
       npm run dev
   ```

5. Changer la ville
   - Aller dans location.json et modifier le nom de la ville

## 📜 LICENSE

Ce projet a été développé dans le cadre d'un test technique.
