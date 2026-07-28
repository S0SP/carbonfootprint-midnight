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
import { Box, Container, Grid, Typography, alpha } from '@mui/material';
import { Header } from './Header';
import ShieldIcon from '@mui/icons-material/ShieldOutlined';
import ForestIcon from '@mui/icons-material/ForestOutlined';
import KeyIcon from '@mui/icons-material/VpnKeyOutlined';

/**
 * Provides layout for the carbon credit tracker application.
 */
export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'hidden' }}
    >
      <Header />

      {/* Background brand graphic watermark */}
      <Box
        sx={{
          position: 'absolute',
          left: '2vw',
          bottom: '2vh',
          opacity: 0.05,
          zIndex: 0,
          pointerEvents: 'none',
          display: { xs: 'none', md: 'block' },
        }}
      >
        <img src="/logo-render.png" alt="logo-image" height={400} style={{ objectFit: 'contain' }} />
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          py: { xs: 4, md: 8 },
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          {/* Hero info column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3.2rem' },
                  lineHeight: 1.2,
                  mb: 3,
                  background: 'linear-gradient(135deg, #ffffff 0%, #a7f3d0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Decarbonize the World with ZK Privacy
              </Typography>

              <Typography variant="body1" sx={{ color: '#94a3b8', fontSize: '1.05rem', mb: 5, lineHeight: 1.6 }}>
                The Carbon Credit Tracker allows organizations to register verified carbon offsets on the Midnight
                blockchain. Complete privacy is guaranteed using Zero-Knowledge proofs—only the issuer can manage or
                retire their credits.
              </Typography>

              {/* Feature Highlights */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      bgcolor: 'rgba(16, 185, 129, 0.1)',
                      p: 1.5,
                      borderRadius: '12px',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                    }}
                  >
                    <ForestIcon sx={{ color: '#10b981' }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ color: '#f8fafc', fontWeight: 600, mb: 0.5 }}>
                      Record Offsets Privately
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                      Register carbon credit details securely on the ledger, protected by cryptography.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      bgcolor: 'rgba(245, 158, 11, 0.1)',
                      p: 1.5,
                      borderRadius: '12px',
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                    }}
                  >
                    <ShieldIcon sx={{ color: '#f59e0b' }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ color: '#f8fafc', fontWeight: 600, mb: 0.5 }}>
                      ZK-Proven Ownership
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                      Prove ownership and retire credits without ever exposing your private secret keys.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      bgcolor: 'rgba(96, 165, 250, 0.1)',
                      p: 1.5,
                      borderRadius: '12px',
                      border: '1px solid rgba(96, 165, 250, 0.2)',
                    }}
                  >
                    <KeyIcon sx={{ color: '#60a5fa' }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ color: '#f8fafc', fontWeight: 600, mb: 0.5 }}>
                      Zero Double-Counting
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                      Cryptographic verification prevents unauthorized retirements or double spending.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Interactive Card Side */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: '420px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
              }}
            >
              {/* Backlight ambient aura */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '350px',
                  height: '350px',
                  background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 0,
                  pointerEvents: 'none',
                }}
              />

              <Box
                sx={{
                  zIndex: 1,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                }}
              >
                {children}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
