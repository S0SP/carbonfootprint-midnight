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

import React from 'react';
import { AppBar, Box, Typography, Chip, alpha } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';

/**
 * A modern application header for the Carbon Credit Tracker.
 */
export const Header: React.FC = () => (
  <AppBar
    position="static"
    data-testid="header"
    elevation={0}
    sx={{
      background: 'rgba(6, 11, 9, 0.75)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(16, 185, 129, 0.12)',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: { xs: 3, md: 8 },
      py: 1.5,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
      data-testid="header-logo"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.05)',
          p: 1,
          borderRadius: '12px',
        }}
      >
        <img src="/midnight-logo.png" alt="Midnight Logo" height={36} />
      </Box>
      <Typography
        variant="h5"
        sx={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          background: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #60a5fa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.5px',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        Carbon Credit Tracker
      </Typography>
    </Box>

    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Chip
        icon={<WifiIcon sx={{ '&&': { color: '#10b981', fontSize: '16px' } }} />}
        label="Midnight Preprod"
        variant="outlined"
        sx={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 600,
          borderColor: 'rgba(16, 185, 129, 0.25)',
          backgroundColor: 'rgba(16, 185, 129, 0.05)',
          color: '#10b981',
          '& .MuiChip-label': {
            px: 1.5,
          },
        }}
      />
    </Box>
  </AppBar>
);
