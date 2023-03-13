const defaultDirectionInfoByDirectionCode = {
  0: { labelByLanguageCode: { fr: 'Nord' } },
  1: { labelByLanguageCode: { fr: 'Sud' } },
  2: { labelByLanguageCode: { fr: 'Est' } },
  3: { labelByLanguageCode: { fr: 'Ouest' } },
  4: { labelByLanguageCode: { fr: 'Centre-Ville' } },
  5: { labelByLanguageCode: { fr: 'Périphérie' } },
  6: { labelByLanguageCode: { fr: 'Aller' } },
  7: { labelByLanguageCode: { fr: 'Retour' } },
  8: { labelByLanguageCode: { fr: 'Horaire' } },
  9: { labelByLanguageCode: { fr: 'Anti-horaire' } },
  10: { labelByLanguageCode: { fr: '1' } },
  11: { labelByLanguageCode: { fr: '2' } },
  12: { labelByLanguageCode: { fr: 'Ascendante' } },
  13: { labelByLanguageCode: { fr: 'Descendante' } },
};

function getFrenchLabelOfDirectionCode(directionCode, { directionInfoByDirectionCode = defaultDirectionInfoByDirectionCode } = {}) {
  return directionInfoByDirectionCode[directionCode]?.labelByLanguageCode?.fr;
}

module.exports = {
  getFrenchLabelOfDirectionCode,
  defaultDirectionInfoByDirectionCode,
};
