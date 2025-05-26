export function getProgressMessageInLoop({
  currentIndex,
  step = 10,
  totalNbOfIndexes,
  messagePrefix,
}: {
  currentIndex: number;
  step: number;
  totalNbOfIndexes: number;
  messagePrefix: string;
}) {
  if ((currentIndex + 1) % step === 0) {
    const percentage =
      totalNbOfIndexes && ((currentIndex / totalNbOfIndexes) * 100).toFixed(0);
    const fullMessage = `${messagePrefix ? `${messagePrefix}: ` : ""}${
      percentage
        ? ` traitement complété à ${percentage} %`
        : `${currentIndex + 1} éléments traités`
    }`;
    return fullMessage;
  }
}
