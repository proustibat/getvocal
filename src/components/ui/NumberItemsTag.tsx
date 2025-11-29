type NumberItemsTagsProps = {value: number, singularWord: string, pluralWord: string};

const NumberItemsTag = ({value, singularWord, pluralWord}: NumberItemsTagsProps) => {
  // for now, we assume the app is in english
  const plural = new Intl.PluralRules("en-US");
  return (
    <p className="bg-slate-50 text-slate-700 tracking-tight text-xs px-3 py-1 rounded-full font-medium text-nowrap border-dashed border border-slate-400">
      {value} {plural.select(value) === "one" ? singularWord : pluralWord}
    </p>
  );
};

export default NumberItemsTag;