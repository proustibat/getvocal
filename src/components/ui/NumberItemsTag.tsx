type NumberItemsTagsProps = {value: number, singularWord: string, pluralWord: string};

const NumberItemsTag = ({value, singularWord, pluralWord}: NumberItemsTagsProps) => {
  // for now, we assume the app is in english
  const plural = new Intl.PluralRules("en-US");
  return (
    <p className="bg-slate-900 text-slate-50 text-xs px-3 py-1 rounded-full font-medium text-nowrap">
      {value} {plural.select(value) === "one" ? singularWord : pluralWord}
    </p>
  );
};

export default NumberItemsTag;