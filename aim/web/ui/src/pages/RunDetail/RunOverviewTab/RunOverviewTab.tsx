import React from 'react';
import _ from 'lodash-es';

import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import IllustrationBlock from 'components/IllustrationBlock/IllustrationBlock';

import { ANALYTICS_EVENT_KEYS } from 'config/analytics/analyticsKeysMap';

import * as analytics from 'services/analytics';

import useRunMetricsBatch from '../hooks/useRunMetricsBatch';

import GitInfoCard from './components/GitInfoCard';
import RunOverviewTabMetricsCard from './components/MetricsCard/RunOverviewTabMetricsCard';
import RunOverviewTabPackagesCard from './components/Packages/RunOverviewTabPackagesCard';
import RunOverviewTabParamsCard from './components/ParamsCard/RunOverviewTabParamsCard';
import RunOverviewSidebar from './components/RunOverviewSidebar/RunOverviewSidebar';
import RunOverviewTabCLIArgumentsCard from './components/CLIArgumentsCard/RunOverviewTabCLIArgumentsCard';
import RunOverviewTabEnvVariablesCard from './components/EnvVariablesCard/RunOverviewTabEnvVariablesCard';
import { IRunOverviewTabProps } from './RunOverviewTab.d';

import './RunOverviewTab.scss';

function RunOverviewTab({ runData, runHash }: IRunOverviewTabProps) {
  useRunMetricsBatch({
    runBatch: runData.runMetricsBatch,
    runTraces: runData.runTraces,
    runHash,
  });

  React.useEffect(() => {
    analytics.pageView(
      ANALYTICS_EVENT_KEYS.runDetails.tabs['overview'].tabView,
    );
  }, []);

  const cardsData: Record<any, any> = React.useMemo(() => {
    const data: any = {};
    const systemParams = runData?.runParams?.__system_params;
    if (!_.isEmpty(runData?.runParams)) {
      data.runParams = runData.runParams;
    }
    if (!_.isEmpty(runData?.runMetricsBatch)) {
      data.runMetricsBatch = runData.runMetricsBatch;
    }
    if (!_.isEmpty(runData?.runSystemBatch)) {
      data.runSystemBatch = runData.runSystemBatch;
    }
    if (systemParams) {
      if (!_.isEmpty(systemParams.arguments)) {
        data.cliArguments = systemParams.arguments;
      }
      if (!_.isEmpty(systemParams.env_variables)) {
        data.envVariables = systemParams.env_variables;
      }
      if (!_.isEmpty(systemParams.packages)) {
        data.packages = systemParams.packages;
      }
      if (!_.isEmpty(systemParams.packages)) {
        data.gitInfo = systemParams.git_info;
      }
    }
    return data;
  }, [runData]);

  return (
    <ErrorBoundary>
      <section className='RunOverviewTab'>
        <div className='RunOverviewTab__content'>
          {_.isEmpty(cardsData) ? (
            <IllustrationBlock size='large' title='No Results' />
          ) : (
            <>
              {_.isEmpty(cardsData?.runParams) ? null : (
                <RunOverviewTabParamsCard
                  runParams={cardsData?.runParams}
                  isRunInfoLoading={runData?.isRunInfoLoading}
                />
              )}
              {_.isEmpty(cardsData?.runMetricsBatch) ? null : (
                <RunOverviewTabMetricsCard
                  isLoading={runData?.isRunBatchLoading}
                  type='metric'
                  runBatch={cardsData?.runMetricsBatch}
                />
              )}

              {_.isEmpty(cardsData?.runSystemBatch) ? null : (
                <RunOverviewTabMetricsCard
                  isLoading={runData?.isRunBatchLoading}
                  type='systemMetric'
                  runBatch={cardsData?.runSystemBatch}
                />
              )}
              {_.isEmpty(cardsData.cliArguments) ? null : (
                <RunOverviewTabCLIArgumentsCard
                  cliArguments={cardsData.cliArguments}
                  isRunInfoLoading={runData?.isRunInfoLoading}
                />
              )}
              {_.isEmpty(cardsData.envVariables) ? null : (
                <RunOverviewTabEnvVariablesCard
                  envVariables={cardsData.envVariables}
                  isRunInfoLoading={runData?.isRunInfoLoading}
                />
              )}
              {_.isEmpty(cardsData.packages) ? null : (
                <RunOverviewTabPackagesCard
                  packages={cardsData.packages}
                  isRunInfoLoading={runData?.isRunInfoLoading}
                />
              )}
              {_.isEmpty(cardsData.gitInfo) ? null : (
                <GitInfoCard data={cardsData.gitInfo} />
              )}
            </>
          )}
        </div>
        <RunOverviewSidebar
          runHash={runHash}
          info={runData.runInfo}
          traces={runData.runTraces}
        />
      </section>
    </ErrorBoundary>
  );
}

RunOverviewTab.displayName = 'RunOverviewTab';

export default React.memo(RunOverviewTab);
