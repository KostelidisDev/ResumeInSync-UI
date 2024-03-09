'use strict'

import Radio from 'backbone.radio'
import * as Channels from './constants/channels/Channels'

Radio.tuneIn(Channels.SECURITY)
Radio.tuneIn(Channels.USER)
Radio.tuneIn(Channels.DASHBOARD)
Radio.tuneIn(Channels.PROFILE)
Radio.tuneIn(Channels.RESUME)
Radio.tuneIn(Channels.LANGUAGE_PROFICIENCY)
