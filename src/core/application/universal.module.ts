import { appContainer } from '../di';

import '../auth/auth.module';
import '../converter/converter.module';
import '../transport/transport.module';
import '../translation/translation.module';
import '../version/version-processor.module';
import '../settings/settings.module';
import '../promise/promise.module';
import '../env/env.module';

import { UniversalApplicationEffects } from './universal-application.effects';
appContainer.bind(UniversalApplicationEffects).to(UniversalApplicationEffects).inSingletonScope();
