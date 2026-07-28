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

import React, { useState } from 'react';
import { type ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { CardActions, CardContent, IconButton, Tooltip, Typography, Button, Box } from '@mui/material';
import BoardAddIcon from '@mui/icons-material/PostAddOutlined';
import CreateBoardIcon from '@mui/icons-material/AddCircleOutlined';
import JoinBoardIcon from '@mui/icons-material/AddLinkOutlined';
import { TextPromptDialog } from './TextPromptDialog';

/**
 * The props required by the {@link EmptyCardContent} component.
 *
 * @internal
 */
export interface EmptyCardContentProps {
  /** A callback that will be called to create a new carbon credit tracker. */
  onCreateBoardCallback: () => void;
  /** A callback that will be called to join an existing carbon credit tracker. */
  onJoinBoardCallback: (contractAddress: ContractAddress) => void;
}

/**
 * Used when there is no board deployment to render a UI allowing the user to join or deploy carbon credit trackers.
 *
 * @internal
 */
export const EmptyCardContent: React.FC<Readonly<EmptyCardContentProps>> = ({
  onCreateBoardCallback,
  onJoinBoardCallback,
}) => {
  const [textPromptOpen, setTextPromptOpen] = useState(false);

  return (
    <React.Fragment>
      <CardContent sx={{ pt: 4, pb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            color: '#10b981',
            mb: 1,
          }}
        >
          <BoardAddIcon sx={{ fontSize: '32px' }} />
        </Box>
        <Typography
          align="center"
          variant="h5"
          sx={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            color: '#f8fafc',
            letterSpacing: '-0.3px',
          }}
        >
          Manage Carbon Credits
        </Typography>
        <Typography
          data-testid="board-posted-message"
          align="center"
          variant="body2"
          sx={{
            color: '#94a3b8',
            lineHeight: 1.5,
            px: 2,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Deploy a new tracker contract to record credits, or join an existing contract address.
        </Typography>
      </CardContent>
      <CardActions sx={{ flexDirection: 'column', gap: 1.5, px: 3, pb: 4, width: '100%' }}>
        <Button
          variant="contained"
          fullWidth
          data-testid="board-deploy-btn"
          startIcon={<CreateBoardIcon />}
          onClick={onCreateBoardCallback}
        >
          Deploy New Board
        </Button>
        <Button
          variant="outlined"
          fullWidth
          data-testid="board-join-btn"
          startIcon={<JoinBoardIcon />}
          onClick={() => {
            setTextPromptOpen(true);
          }}
        >
          Join Existing Board
        </Button>
      </CardActions>
      <TextPromptDialog
        prompt="Enter Carbon Credit Contract Address"
        isOpen={textPromptOpen}
        onCancel={() => {
          setTextPromptOpen(false);
        }}
        onSubmit={(text) => {
          setTextPromptOpen(false);
          onJoinBoardCallback(text);
        }}
      />
    </React.Fragment>
  );
};
