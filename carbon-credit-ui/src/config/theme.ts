// This file is part of midnightntwrk/example-carbon-credit.
// Copyright (C) Midnight Foundation
// SPDX-License-Identifier: Apache-2.0
// Licensed under the Apache License, Version 2.0 (the "License");
// You may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { createTheme, alpha } from '@mui/material';

const emeraldGreen = '#10b981';
const amberGold = '#f59e0b';
const bgDark = '#060b09';
const paperDark = '#0b1310';

export const theme = createTheme({
  typography: {
    fontFamily: "'Inter', 'Helvetica', 'Arial', sans-serif",
    h1: { fontFamily: "'Outfit', sans-serif", fontWeight: 700 },
    h2: { fontFamily: "'Outfit', sans-serif", fontWeight: 700 },
    h3: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    h4: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    h5: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    h6: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    subtitle1: { fontFamily: "'Outfit', sans-serif" },
    subtitle2: { fontFamily: "'Outfit', sans-serif" },
    allVariants: {
      color: '#f8fafc',
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: emeraldGreen,
      light: alpha(emeraldGreen, 0.4),
      dark: alpha(emeraldGreen, 0.8),
    },
    secondary: {
      main: amberGold,
    },
    background: {
      default: bgDark,
      paper: paperDark,
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: bgDark,
          backgroundImage: `radial-gradient(circle at 50% 20%, ${alpha(emeraldGreen, 0.12)} 0%, transparent 60%)`,
          backgroundAttachment: 'fixed',
          scrollbarWidth: 'thin',
          scrollbarColor: `${emeraldGreen} ${bgDark}`,
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: bgDark,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: alpha(emeraldGreen, 0.3),
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: alpha(emeraldGreen, 0.6),
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: `linear-gradient(135deg, ${alpha(paperDark, 0.9)} 0%, ${alpha('#080d0b', 0.95)} 100%)`,
          backdropFilter: 'blur(16px)',
          border: `1px solid ${alpha(emeraldGreen, 0.15)}`,
          boxShadow: `0 12px 32px 0 rgba(0, 0, 0, 0.6), 0 0 1px 1px ${alpha(emeraldGreen, 0.05)}`,
          borderRadius: '20px',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: alpha(emeraldGreen, 0.35),
            boxShadow: `0 20px 40px 0 rgba(0, 0, 0, 0.7), 0 0 12px 2px ${alpha(emeraldGreen, 0.15)}`,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          fontFamily: "'Outfit', sans-serif",
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          background: `linear-gradient(135deg, ${emeraldGreen} 0%, ${alpha(emeraldGreen, 0.8)} 100%)`,
          color: '#060b09',
          boxShadow: `0 4px 14px 0 ${alpha(emeraldGreen, 0.3)}`,
          '&:hover': {
            background: `linear-gradient(135deg, ${alpha(emeraldGreen, 0.95)} 0%, ${alpha(emeraldGreen, 0.75)} 100%)`,
            boxShadow: `0 6px 20px 0 ${alpha(emeraldGreen, 0.45)}`,
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(1px)',
          },
          '&.Mui-disabled': {
            background: alpha('#ffffff', 0.1),
            color: alpha('#ffffff', 0.3),
          },
        },
        outlined: {
          borderColor: alpha(emeraldGreen, 0.4),
          color: emeraldGreen,
          '&:hover': {
            borderColor: emeraldGreen,
            background: alpha(emeraldGreen, 0.08),
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: `linear-gradient(135deg, ${paperDark} 0%, #060a08 100%)`,
          border: `1px solid ${alpha(emeraldGreen, 0.25)}`,
          borderRadius: '20px',
          boxShadow: '0 24px 64px 0 rgba(0, 0, 0, 0.8)',
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            transition: 'all 0.2s ease',
            color: '#f8fafc',
            '& fieldset': {
              borderColor: alpha(emeraldGreen, 0.2),
            },
            '&:hover fieldset': {
              borderColor: alpha(emeraldGreen, 0.45),
            },
            '&.Mui-focused fieldset': {
              borderColor: emeraldGreen,
              boxShadow: `0 0 0 2px ${alpha(emeraldGreen, 0.25)}`,
            },
          },
        },
      },
    },
  },
});
