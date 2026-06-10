export const fr = {
  actions: {
    add: 'Ajouter',
    create: 'Créer',
    update: 'Mettre à jour',
    save: 'Sauvegarder',
    send: 'Envoyer',
    delete: 'Supprimer',
    cancel: 'Fermer',
    logout: 'Déconnexion',
    ok: 'Ok',
    yes: 'Oui',
  },
  modal: {
    confirm_message: 'Êtes-vous sûr ?',
  },
  success: {
    saved: 'Vos modifications ont été enregistrées.',
  },
  errors: {
    default: 'Une erreur est survenue. Veuillez réessayer.',
    invalid_url: 'Veuillez utiliser une URL valide',
  },
  auth: {
    signin_title: 'Connexion',
    signin_description: 'Entrez votre email et votre mot de passe.',
    signup_title: 'Créer un compte',
    signup_description:
      'Entrez votre e-mail et votre mot de passe pour créer un compte.',
    signup_confirm_error_title: 'Lien de vérification invalide',
    signup_confirm_error_description:
      'Ce lien de vérification est invalide ou a expiré. Relancez l’inscription pour recevoir un nouveau lien.',
    signup_exchange_code_error:
      "Votre compte a bien été confirmé, mais la connexion automatique a échoué. Essayez de vous connecter manuellement ou contactez notre équipe d'assistance si le problème persiste.",
    signup_create_profile_error:
      "La création de votre profil a échoué. Veuillez contacter notre équipe d'assistance pour obtenir de l'aide.",
    signup_create_profile_success:
      'Bienvenue ! Votre compte a été créé avec succès.',
    delete_account_title: 'Supprimer le compte',
    delete_account_description:
      'Vous êtes sur le point de supprimer de votre compte.',
    reset_email_title: 'Modifier l’adresse e-mail',
    reset_password_title: 'Réinitialiser le mot de passe',
    reset_password_description:
      'Entrez votre e-mail pour recevoir un lien de réinitialisation du mot de passe.',
    field_email: 'E-mail',
    field_password: 'Mot de passe',
    field_confirmedPassword: 'Confirmez votre mot de passe',
    field_confirmedEmail: 'Confirmez votre adresse e-mail',
    forgot_password: 'Mot de passe oublié ?',
    email_sent_title: 'Votre e-mail a bien été envoyé.',
    email_sent_signup_description:
      'Veuillez consulter votre e-mail pour confirmer votre compte.',
    email_sent_reset_password_description:
      'Si un compte existe, vous recevrez bientôt un lien de réinitialisation du mot de passe. Veuillez suivre les instructions.',
    reset_password_done_description:
      'Votre mot de passe a été mis à jour. Veuillez vous connecter.',
    reset_email_done_description:
      'Votre e-mail a été mis à jour avec succès. Veuillez vous connecter avec votre nouvel e-mail.',
  },
  profile: {
    name: 'Nom',
    name_placeholder: 'Ex: John',
    surname: 'Prénom',
    surname_placeholder: 'Ex: Doe',
    pseudo: 'Pseudo',
    pseudo_placeholder: 'Ex: Mimi Siku',
    date_of_birth: 'Date de naissance',
  },
  performance: {
    weight: 'Poids (kg)',
    weight_placeholder: 'Ex: 34 kg',
    reps: 'Reps',
    reps_placeholder: 'Ex: 10 repetitions',
    date: 'Date',
    create_success: 'Parfait! Votre performance a été mise à jour.',
    delete_message: 'Vous êtes sur le point de supprimer cette performance.',
    empty_state_description:
      'Aucune performance pour le moment. Créez la première pour commencer.',
  },
  exercise: {
    create_title: 'Nouvel exercice',
    create_title_placeholder: 'Bench press',
    create_success: 'Votre exercice: {{name}} a été créé avec succès!',
    delete_message: 'Vous êtes sur le point de supprimer cet exercice.',
  },
} as const;
