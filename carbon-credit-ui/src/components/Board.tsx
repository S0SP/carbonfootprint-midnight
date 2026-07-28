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

import React, { useCallback, useEffect, useState } from 'react';
import { type ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import {
  Backdrop,
  CircularProgress,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Skeleton,
  Typography,
  TextField,
  Box,
  Button,
  Chip,
  alpha,
} from '@mui/material';
import LockIcon from '@mui/icons-material/LockOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpenOutlined';
import DeleteIcon from '@mui/icons-material/DeleteSweepOutlined';
import WriteIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import CopyIcon from '@mui/icons-material/ContentCopyOutlined';
import StopIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import { type CarbonCreditDerivedState, type DeployedCarbonCreditAPI } from '../../../api/src/index';
import { useDeployedBoardContext } from '../hooks';
import { type BoardDeployment } from '../contexts';
import { type Observable } from 'rxjs';
import { State } from '../../../contract/src/index';
import { EmptyCardContent } from './Board.EmptyCardContent';

/** The props required by the {@link Board} component. */
export interface BoardProps {
  /** The observable carbon credit tracker deployment. */
  boardDeployment$?: Observable<BoardDeployment>;
}

/**
 * Provides the UI for a deployed carbon credit tracker contract; allowing messages to be posted or removed
 * following the rules enforced by the underlying Compact contract.
 */
export const Board: React.FC<Readonly<BoardProps>> = ({ boardDeployment$ }) => {
  const boardApiProvider = useDeployedBoardContext();
  const [boardDeployment, setBoardDeployment] = useState<BoardDeployment>();
  const [deployedBoardAPI, setDeployedBoardAPI] = useState<DeployedCarbonCreditAPI>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [boardState, setBoardState] = useState<CarbonCreditDerivedState>();
  const [messagePrompt, setMessagePrompt] = useState<string>();
  const [isWorking, setIsWorking] = useState(!!boardDeployment$);

  const onCreateBoard = useCallback(() => boardApiProvider.resolve(), [boardApiProvider]);
  const onJoinBoard = useCallback(
    (contractAddress: ContractAddress) => boardApiProvider.resolve(contractAddress),
    [boardApiProvider],
  );

  const onPostMessage = useCallback(async () => {
    if (!messagePrompt) {
      return;
    }

    try {
      if (deployedBoardAPI) {
        setIsWorking(true);
        await deployedBoardAPI.recordCredit(messagePrompt);
      }
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsWorking(false);
    }
  }, [deployedBoardAPI, setErrorMessage, setIsWorking, messagePrompt]);

  const onDeleteMessage = useCallback(async () => {
    try {
      if (deployedBoardAPI) {
        setIsWorking(true);
        await deployedBoardAPI.retireCredit();
      }
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsWorking(false);
    }
  }, [deployedBoardAPI, setErrorMessage, setIsWorking]);

  const onCopyContractAddress = useCallback(async () => {
    if (deployedBoardAPI) {
      await navigator.clipboard.writeText(deployedBoardAPI.deployedContractAddress);
    }
  }, [deployedBoardAPI]);

  useEffect(() => {
    if (!boardDeployment$) {
      return;
    }

    const subscription = boardDeployment$.subscribe(setBoardDeployment);

    return () => {
      subscription.unsubscribe();
    };
  }, [boardDeployment$]);

  useEffect(() => {
    if (!boardDeployment) {
      return;
    }
    if (boardDeployment.status === 'in-progress') {
      return;
    }

    setIsWorking(false);

    if (boardDeployment.status === 'failed') {
      setErrorMessage(
        boardDeployment.error.message.length ? boardDeployment.error.message : 'Encountered an unexpected error.',
      );
      return;
    }

    setDeployedBoardAPI(boardDeployment.api);
    const subscription = boardDeployment.api.state$.subscribe(setBoardState);
    return () => {
      subscription.unsubscribe();
    };
  }, [boardDeployment, setIsWorking, setErrorMessage, setDeployedBoardAPI]);

  return (
    <Card
      sx={{
        position: 'relative',
        width: '100%',
        minWidth: 320,
        minHeight: 380,
        display: 'flex',
        flexDirection: 'column',
      }}
      color="primary"
    >
      {!boardDeployment$ && (
        <EmptyCardContent onCreateBoardCallback={onCreateBoard} onJoinBoardCallback={onJoinBoard} />
      )}

      {boardDeployment$ && (
        <React.Fragment>
          <Backdrop
            sx={{
              position: 'absolute',
              color: '#10b981',
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: 'rgba(6, 11, 9, 0.85)',
              borderRadius: '20px',
            }}
            open={isWorking}
          >
            <CircularProgress data-testid="board-working-indicator" color="primary" />
          </Backdrop>

          <Backdrop
            sx={{
              position: 'absolute',
              color: '#ef4444',
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: 'rgba(6, 11, 9, 0.95)',
              flexDirection: 'column',
              gap: 2.5,
              borderRadius: '20px',
              px: 3,
              textAlign: 'center',
            }}
            open={!!errorMessage}
          >
            <StopIcon fontSize="large" sx={{ color: '#ef4444' }} />
            <Typography
              component="div"
              data-testid="board-error-message"
              sx={{ color: '#ef4444', fontWeight: 600, mb: 1, fontFamily: "'Inter', sans-serif" }}
            >
              {errorMessage}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setErrorMessage(undefined)}
              sx={{
                color: '#ef4444',
                borderColor: 'rgba(239, 68, 68, 0.4)',
                '&:hover': { borderColor: '#ef4444', background: 'rgba(239, 68, 68, 0.08)' },
              }}
            >
              Dismiss
            </Button>
          </Backdrop>

          <CardHeader
            avatar={
              boardState ? (
                boardState.state === State.VACANT || (boardState.state === State.OCCUPIED && boardState.isOwner) ? (
                  <LockOpenIcon data-testid="recordCredit-unlocked-icon" sx={{ color: '#10b981' }} />
                ) : (
                  <LockIcon data-testid="recordCredit-locked-icon" sx={{ color: '#f59e0b' }} />
                )
              ) : (
                <Skeleton variant="circular" width={24} height={24} />
              )
            }
            titleTypographyProps={{
              sx: {
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                color: '#f8fafc',
                fontSize: '0.95rem',
              },
            }}
            title={toShortFormatContractAddress(deployedBoardAPI?.deployedContractAddress) ?? 'Deploying...'}
            action={
              deployedBoardAPI?.deployedContractAddress ? (
                <IconButton
                  title="Copy contract address"
                  onClick={onCopyContractAddress}
                  sx={{ color: '#94a3b8', '&:hover': { color: '#10b981' } }}
                >
                  <CopyIcon fontSize="small" />
                </IconButton>
              ) : (
                <Skeleton variant="circular" width={24} height={24} />
              )
            }
            sx={{ borderBottom: '1px solid rgba(16, 185, 129, 0.1)', pb: 1.5, pt: 2.5, px: 3 }}
          />

          <CardContent sx={{ flexGrow: 1, pt: 3, pb: 2, px: 3, display: 'flex', flexDirection: 'column' }}>
            {boardState ? (
              boardState.state === State.OCCUPIED ? (
                <Box
                  sx={{
                    minHeight: 140,
                    p: 2.5,
                    borderRadius: '12px',
                    backgroundColor: 'rgba(16, 185, 129, 0.04)',
                    border: '1px dashed rgba(16, 185, 129, 0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    data-testid="board-posted-message"
                    sx={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1rem',
                      lineHeight: 1.5,
                      color: '#e2e8f0',
                      wordBreak: 'break-word',
                      mb: 2,
                    }}
                  >
                    {boardState.message}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    <Typography sx={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: "'Outfit', sans-serif" }}>
                      Seq: #{boardState.sequence}
                    </Typography>
                    {boardState.isOwner ? (
                      <Chip
                        label="Your Record"
                        size="small"
                        sx={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          backgroundColor: 'rgba(16, 185, 129, 0.15)',
                          color: '#10b981',
                          border: '1px solid rgba(16, 185, 129, 0.3)',
                          borderRadius: '6px',
                        }}
                      />
                    ) : (
                      <Chip
                        label="Protected by ZK"
                        size="small"
                        sx={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          backgroundColor: 'rgba(245, 158, 11, 0.15)',
                          color: '#f59e0b',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          borderRadius: '6px',
                        }}
                      />
                    )}
                  </Box>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography variant="body2" sx={{ color: '#94a3b8', mb: 0.5, fontFamily: "'Inter', sans-serif" }}>
                    Record a new carbon credit offset verification.
                  </Typography>
                  <TextField
                    id="message-prompt"
                    data-testid="board-message-prompt"
                    variant="outlined"
                    focused
                    fullWidth
                    multiline
                    minRows={4}
                    maxRows={4}
                    placeholder="e.g., Solar farm offset - 500 tonnes CO2"
                    size="medium"
                    color="primary"
                    slotProps={{ htmlInput: { style: { color: '#f8fafc', fontFamily: "'Inter', sans-serif" } } }}
                    onChange={(e) => {
                      setMessagePrompt(e.target.value);
                    }}
                  />
                </Box>
              )
            ) : (
              <Skeleton variant="rectangular" width="100%" height={140} sx={{ borderRadius: '12px' }} />
            )}
          </CardContent>

          <CardActions sx={{ px: 3, pb: 3, pt: 1, gap: 1.5 }}>
            {deployedBoardAPI ? (
              boardState?.state === State.OCCUPIED ? (
                <Button
                  variant="outlined"
                  fullWidth
                  data-testid="board-take-down-message-btn"
                  disabled={!boardState.isOwner}
                  onClick={onDeleteMessage}
                  startIcon={<DeleteIcon />}
                  sx={{
                    borderColor: 'rgba(239, 68, 68, 0.4)',
                    color: '#ef4444',
                    '&:hover': {
                      borderColor: '#ef4444',
                      background: 'rgba(239, 68, 68, 0.08)',
                    },
                    '&.Mui-disabled': {
                      borderColor: 'rgba(255, 255, 255, 0.05)',
                      color: 'rgba(255, 255, 255, 0.25)',
                    },
                  }}
                >
                  Retire Carbon Credit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  data-testid="board-recordCredit-message-btn"
                  disabled={!messagePrompt?.length}
                  onClick={onPostMessage}
                  startIcon={<WriteIcon />}
                >
                  Record Carbon Credit
                </Button>
              )
            ) : (
              <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: '12px' }} />
            )}
          </CardActions>
        </React.Fragment>
      )}
    </Card>
  );
};

/** @internal */
const toShortFormatContractAddress = (contractAddress: ContractAddress | undefined): React.ReactElement | undefined =>
  contractAddress ? (
    <span data-testid="board-address">
      0x{contractAddress?.replace(/^[A-Fa-f0-9]{6}([A-Fa-f0-9]{8}).*([A-Fa-f0-9]{8})$/g, '$1...$2')}
    </span>
  ) : undefined;
