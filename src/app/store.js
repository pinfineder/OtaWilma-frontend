import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/authentication/authSlice';
import errorSlice from '../features/errors/errorSlice';
import configSlice from '../features/themes/configSlice';
import themeSlice from '../features/themes/themeSlice';
import messageSlice from '../features/messages/messageSlice';
import gradeSlice from '../features/grades/gradeSlice';
import newsSlice from '../features/news/newsSlice';
import scheduleSlice from '../features/schedule/scheduleSlice';
import lopsSlice from '../features/grades/lopsSlice';
import courseSlice from '../features/courses/traySlice';
import homeworkSlice from '../features/schedule/homeworkSlice';
import teacherSlice from '../features/teachers/teacherSlice';
import apiSlice from '../features/api/apiSlice';
import versionSlice from '../features/version/versionSlice';

export default configureStore({
  reducer: {
    auth: authSlice,
    config: configSlice,
    errors: errorSlice,
    themes: themeSlice,
    messages: messageSlice,
    grades: gradeSlice,
    news: newsSlice,
    schedule: scheduleSlice,
    lops: lopsSlice,
    tray: courseSlice,
    homework: homeworkSlice,
    teachers: teacherSlice,
    api: apiSlice,
    version: versionSlice
  },
});
