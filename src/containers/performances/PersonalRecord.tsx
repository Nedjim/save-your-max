import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import Tag from '@/src/components/Tag';
import { DEFAULT_CONTAINER_BACKGROUND, WHITE } from '@/src/constants/colors';
import { Performance } from '@/src/types';
import { DATE_FORMAT } from '@/src/utils/date';
import {
  getBestEstimatedPerformance,
  getBestPerformance,
} from '@/src/utils/performances';

type PersonalRecordProps = {
  performances: Performance[];
};

const PersonalRecord = (props: PersonalRecordProps) => {
  const { performances } = props;

  const { t } = useTranslation();
  const bestPerformance = getBestPerformance(performances);
  const pr = bestPerformance.weight;
  const date = dayjs(bestPerformance.date).format(DATE_FORMAT);
  const bestEstimatedPerformance = getBestEstimatedPerformance(
    performances,
    pr,
  );

  return (
    <View style={styles.prContainer}>
      <View style={styles.pr}>
        <Tag label={t('performance.pr')} />
        <Text style={styles.text}>{pr} kg</Text>
        <Text style={styles.text}>{date}</Text>
      </View>
      {bestEstimatedPerformance && (
        <Text style={styles.estimatedPr}>
          {`${t('performance.bestEstimatedOneRM')}: ${bestEstimatedPerformance.estimatedOneRM} kg`}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  prContainer: {
    backgroundColor: DEFAULT_CONTAINER_BACKGROUND,
    padding: 16,
    paddingBottom: 8,
    borderRadius: 4,
  },
  pr: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: WHITE,
  },
  estimatedPr: {
    color: '#86a7a7',
    paddingTop: 16,
  },
});

export default PersonalRecord;
