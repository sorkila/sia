// Overlay script for agent-overlay.html

document.addEventListener('DOMContentLoaded', function() {
    const chatOverlayContainer = document.getElementById('chatOverlayContainer');
    const siaWelcomeScreen = document.getElementById('siaWelcomeScreen');
    const siaActionChips = document.querySelectorAll('.sia-action-chip');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    // Show the chat overlay initially (with welcome screen)
    if (chatOverlayContainer) {
        // Show overlay after a short delay to let page load
        setTimeout(() => {
            showChatOverlay();
        }, 500);
    }

    // Set static placeholder for overlay page
    if (userInput) {
        userInput.placeholder = 'Or ask anything else about the report...';
    }

    // Function to show chat overlay
    function showChatOverlay() {
        if (chatOverlayContainer) {
            chatOverlayContainer.classList.add('show');
        }
    }

    // Function to hide chat overlay
    function hideChatOverlay() {
        if (chatOverlayContainer) {
            chatOverlayContainer.classList.remove('show');
        }
    }

    // Handle action chip clicks - show overlay and send message immediately
    siaActionChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            showChatOverlay();
            sendActionMessage(action);
        });
    });

    // Handle input field interaction - show overlay when user starts typing
    if (userInput) {
        userInput.addEventListener('focus', function() {
            showChatOverlay();
        });
    }

    // Handle send button click - show overlay if not already shown
    if (sendButton) {
        sendButton.addEventListener('click', function() {
            if (userInput && userInput.value.trim()) {
                showChatOverlay();
            }
        });
    }

    // Handle Enter key in input - show overlay if not already shown
    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && userInput.value.trim()) {
                showChatOverlay();
            }
        });
    }

    // Note: No backdrop click to close since overlay is a floating container

    // Header toggle functionality
    const headerToggle = document.getElementById('headerToggle');
    const headerContainer = document.querySelector('.header-container');
    
    if (headerToggle && headerContainer) {
        headerToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            if (chatOverlayContainer) {
                chatOverlayContainer.classList.toggle('collapsed');
            }
        });
    }

    function sendActionMessage(action) {
        // Hide welcome screen
        if (siaWelcomeScreen) {
            siaWelcomeScreen.style.display = 'none';
        }

        // Get message based on action
        let message = "";
        let mockResponse = "";
        
        if (action === 'summarize-trends') {
            message = "Summarize the key trends from this report";
            mockResponse = "Based on the Q4 2025 Performance Report, here are the key trends:\n\n**Performance Improvement**: Overall scores increased by 12% compared to Q3, with 78% of employees showing improvement. The most significant gains were in team collaboration and goal achievement.\n\n**Department Highlights**: Engineering and Sales led with scores of 4.5 and 4.3 respectively, while Operations showed the most improvement potential at 3.8.\n\n**Goal Achievement**: 84% of employees met or exceeded quarterly goals, up from 76% in Q3. This represents a consistent upward trajectory throughout the quarter.\n\n**Engagement**: Employee engagement reached an all-time high of 4.3/5.0, with strong improvements in recognition and career development opportunities.\n\nWould you like me to dive deeper into any specific area?";
        } else if (action === 'compare-q3') {
            message = "Compare Q4 performance to Q3";
            mockResponse = "Here's a comparison of Q4 2025 vs Q3 2025:\n\n**Performance Scores**:\n- Q3 Average: 3.8/5.0\n- Q4 Average: 4.2/5.0\n- Improvement: +10.5%\n\n**Goal Achievement**:\n- Q3: 76% of employees met goals\n- Q4: 84% of employees met goals\n- Improvement: +8 percentage points\n\n**Key Improvements**:\n- Team collaboration increased by 23%\n- Training program participants showed 18% higher improvement\n- Retention improved to 94% (from 92%)\n- Voluntary turnover decreased by 8%\n\n**Areas of Focus**:\n- Operations department still below 4.0 (currently 3.8)\n- 89 employees identified for improvement support\n\nThe data shows a strong positive trajectory. Should I help you create action plans for the areas needing attention?";
        }
        
        // Send the message immediately
        if (message && chatMessages && typeof addMessage === 'function') {
            // Add user message
            addMessage(message, true);
            
            // Add AI response after a short delay
            setTimeout(() => {
                if (mockResponse && typeof addMessage === 'function') {
                    addMessage(mockResponse, false);
                }
            }, 800);
        }
        
        // Focus on input
        setTimeout(() => {
            if (userInput) {
                userInput.placeholder = 'Or ask anything else about the report...';
                userInput.focus();
            }
        }, 300);
    }

    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Generate charts for the report
    generatePerformanceTrendChart();
    generateDepartmentChart();
    generateGoalAchievementChart();
});

// Chart generation functions
function generatePerformanceTrendChart() {
    const container = document.getElementById('performanceTrendChart');
    if (!container) return;

    const months = ['Oct', 'Nov', 'Dec'];
    const scores = [3.9, 4.1, 4.2];
    
    const maxValue = Math.max(...scores);
    const minValue = Math.min(...scores);
    const range = maxValue - minValue || 1;
    const chartHeight = 200;
    const chartWidth = 600;
    const leftPadding = 40; // More space for Y-axis labels
    const rightPadding = 20;
    const topPadding = 30; // More space for value labels
    const bottomPadding = 40;
    const barWidth = (chartWidth - leftPadding - rightPadding) / 3;
    const padding = leftPadding;
    
    const graphContainer = document.createElement('div');
    graphContainer.className = 'fte-graph-container';
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', chartWidth);
    svg.setAttribute('height', chartHeight + topPadding + bottomPadding);
    svg.setAttribute('viewBox', `0 0 ${chartWidth} ${chartHeight + topPadding + bottomPadding}`);
    svg.style.maxWidth = '100%';
    svg.style.height = 'auto';
    
    // Background
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', chartWidth);
    bg.setAttribute('height', chartHeight + topPadding + bottomPadding);
    bg.setAttribute('fill', '#fafafa');
    bg.setAttribute('rx', '8');
    svg.appendChild(bg);
    
    // Grid lines
    for (let i = 0; i <= 5; i++) {
        const y = topPadding + (chartHeight / 5) * i;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', leftPadding);
        line.setAttribute('y1', y);
        line.setAttribute('x2', chartWidth - rightPadding);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', 'rgba(0, 0, 0, 0.05)');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);
    }
    
    // Bars
    scores.forEach((value, index) => {
        const barHeight = ((value - minValue) / range) * chartHeight;
        const x = leftPadding + index * barWidth + barWidth * 0.1;
        const y = topPadding + chartHeight - barHeight;
        const width = barWidth * 0.8;
        
        const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bar.setAttribute('x', x);
        bar.setAttribute('y', y);
        bar.setAttribute('width', width);
        bar.setAttribute('height', barHeight);
        bar.setAttribute('fill', '#9773FF');
        bar.setAttribute('rx', '4');
        bar.setAttribute('opacity', '0');
        svg.appendChild(bar);
        
        setTimeout(() => {
            bar.style.transition = 'opacity 0.3s ease';
            bar.setAttribute('opacity', '1');
        }, index * 100);
        
        // Value label - ensure it's always visible above the bar
        const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        valueText.setAttribute('x', x + width / 2);
        valueText.setAttribute('y', Math.max(topPadding - 5, y - 8));
        valueText.setAttribute('text-anchor', 'middle');
        valueText.setAttribute('font-size', '11');
        valueText.setAttribute('font-weight', '500');
        valueText.setAttribute('fill', '#1a1a1a');
        valueText.setAttribute('opacity', '0');
        valueText.textContent = value.toFixed(1);
        svg.appendChild(valueText);
        
        setTimeout(() => {
            valueText.style.transition = 'opacity 0.3s ease';
            valueText.setAttribute('opacity', '1');
        }, index * 100 + 300);
        
        // Month label
        const monthText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        monthText.setAttribute('x', x + width / 2);
        monthText.setAttribute('y', topPadding + chartHeight + 25);
        monthText.setAttribute('text-anchor', 'middle');
        monthText.setAttribute('font-size', '11');
        monthText.setAttribute('fill', '#6b7280');
        monthText.textContent = months[index];
        svg.appendChild(monthText);
    });
    
    // Y-axis labels
    for (let i = 0; i <= 5; i++) {
        const value = (minValue + (range / 5) * (5 - i)).toFixed(1);
        const y = topPadding + (chartHeight / 5) * i;
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', leftPadding - 10);
        label.setAttribute('y', y + 4);
        label.setAttribute('text-anchor', 'end');
        label.setAttribute('font-size', '10');
        label.setAttribute('fill', '#9ca3af');
        label.textContent = value;
        svg.appendChild(label);
    }
    
    graphContainer.appendChild(svg);
    container.appendChild(graphContainer);
}

function generateDepartmentChart() {
    const container = document.getElementById('departmentChart');
    if (!container) return;

    const departments = ['Engineering', 'Sales', 'Marketing', 'Support', 'Operations'];
    const scores = [4.5, 4.3, 4.1, 3.9, 3.8];
    
    const maxValue = Math.max(...scores);
    const minValue = Math.min(...scores);
    const range = maxValue - minValue || 1;
    const chartHeight = 200;
    const chartWidth = 600;
    const leftPadding = 40;
    const rightPadding = 20;
    const topPadding = 30;
    const bottomPadding = 80; // More space for rotated department labels
    const barWidth = (chartWidth - leftPadding - rightPadding) / departments.length;
    const padding = leftPadding;
    
    const graphContainer = document.createElement('div');
    graphContainer.className = 'fte-graph-container';
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', chartWidth);
    svg.setAttribute('height', chartHeight + topPadding + bottomPadding);
    svg.setAttribute('viewBox', `0 0 ${chartWidth} ${chartHeight + topPadding + bottomPadding}`);
    svg.style.maxWidth = '100%';
    svg.style.height = 'auto';
    
    // Background
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', chartWidth);
    bg.setAttribute('height', chartHeight + topPadding + bottomPadding);
    bg.setAttribute('fill', '#fafafa');
    bg.setAttribute('rx', '8');
    svg.appendChild(bg);
    
    // Grid lines
    for (let i = 0; i <= 5; i++) {
        const y = topPadding + (chartHeight / 5) * i;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', leftPadding);
        line.setAttribute('y1', y);
        line.setAttribute('x2', chartWidth - rightPadding);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', 'rgba(0, 0, 0, 0.05)');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);
    }
    
    // Bars
    scores.forEach((value, index) => {
        const barHeight = ((value - minValue) / range) * chartHeight;
        const x = leftPadding + index * barWidth + barWidth * 0.1;
        const y = topPadding + chartHeight - barHeight;
        const width = barWidth * 0.8;
        
        const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bar.setAttribute('x', x);
        bar.setAttribute('y', y);
        bar.setAttribute('width', width);
        bar.setAttribute('height', barHeight);
        bar.setAttribute('fill', '#9773FF');
        bar.setAttribute('rx', '4');
        bar.setAttribute('opacity', '0');
        svg.appendChild(bar);
        
        setTimeout(() => {
            bar.style.transition = 'opacity 0.3s ease';
            bar.setAttribute('opacity', '1');
        }, index * 100);
        
        // Value label - ensure it's always visible
        const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        valueText.setAttribute('x', x + width / 2);
        valueText.setAttribute('y', Math.max(topPadding - 5, y - 8));
        valueText.setAttribute('text-anchor', 'middle');
        valueText.setAttribute('font-size', '11');
        valueText.setAttribute('font-weight', '500');
        valueText.setAttribute('fill', '#1a1a1a');
        valueText.setAttribute('opacity', '0');
        valueText.textContent = value.toFixed(1);
        svg.appendChild(valueText);
        
        setTimeout(() => {
            valueText.style.transition = 'opacity 0.3s ease';
            valueText.setAttribute('opacity', '1');
        }, index * 100 + 300);
        
        // Department label (rotated) - positioned with more space
        const deptText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        const labelX = x + width / 2;
        const labelY = topPadding + chartHeight + 40;
        deptText.setAttribute('x', labelX);
        deptText.setAttribute('y', labelY);
        deptText.setAttribute('text-anchor', 'middle');
        deptText.setAttribute('font-size', '10');
        deptText.setAttribute('fill', '#6b7280');
        deptText.setAttribute('transform', `rotate(-45 ${labelX} ${labelY})`);
        deptText.textContent = departments[index];
        svg.appendChild(deptText);
    });
    
    // Y-axis labels
    for (let i = 0; i <= 5; i++) {
        const value = (minValue + (range / 5) * (5 - i)).toFixed(1);
        const y = topPadding + (chartHeight / 5) * i;
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', leftPadding - 10);
        label.setAttribute('y', y + 4);
        label.setAttribute('text-anchor', 'end');
        label.setAttribute('font-size', '10');
        label.setAttribute('fill', '#9ca3af');
        label.textContent = value;
        svg.appendChild(label);
    }
    
    graphContainer.appendChild(svg);
    container.appendChild(graphContainer);
}

function generateGoalAchievementChart() {
    const container = document.getElementById('goalAchievementChart');
    if (!container) return;

    const months = ['Oct', 'Nov', 'Dec'];
    const percentages = [76, 80, 84];
    
    const maxValue = 100;
    const minValue = 70;
    const range = maxValue - minValue;
    const chartHeight = 200;
    const chartWidth = 600;
    const leftPadding = 40;
    const rightPadding = 20;
    const topPadding = 30;
    const bottomPadding = 40;
    const barWidth = (chartWidth - leftPadding - rightPadding) / 3;
    const padding = leftPadding;
    
    const graphContainer = document.createElement('div');
    graphContainer.className = 'fte-graph-container';
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', chartWidth);
    svg.setAttribute('height', chartHeight + topPadding + bottomPadding);
    svg.setAttribute('viewBox', `0 0 ${chartWidth} ${chartHeight + topPadding + bottomPadding}`);
    svg.style.maxWidth = '100%';
    svg.style.height = 'auto';
    
    // Background
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', chartWidth);
    bg.setAttribute('height', chartHeight + topPadding + bottomPadding);
    bg.setAttribute('fill', '#fafafa');
    bg.setAttribute('rx', '8');
    svg.appendChild(bg);
    
    // Grid lines
    for (let i = 0; i <= 5; i++) {
        const y = topPadding + (chartHeight / 5) * i;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', leftPadding);
        line.setAttribute('y1', y);
        line.setAttribute('x2', chartWidth - rightPadding);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', 'rgba(0, 0, 0, 0.05)');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);
    }
    
    // Bars
    percentages.forEach((value, index) => {
        const barHeight = ((value - minValue) / range) * chartHeight;
        const x = leftPadding + index * barWidth + barWidth * 0.1;
        const y = topPadding + chartHeight - barHeight;
        const width = barWidth * 0.8;
        
        const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bar.setAttribute('x', x);
        bar.setAttribute('y', y);
        bar.setAttribute('width', width);
        bar.setAttribute('height', barHeight);
        bar.setAttribute('fill', '#9773FF');
        bar.setAttribute('rx', '4');
        bar.setAttribute('opacity', '0');
        svg.appendChild(bar);
        
        setTimeout(() => {
            bar.style.transition = 'opacity 0.3s ease';
            bar.setAttribute('opacity', '1');
        }, index * 100);
        
        // Value label - ensure it's always visible
        const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        valueText.setAttribute('x', x + width / 2);
        valueText.setAttribute('y', Math.max(topPadding - 5, y - 8));
        valueText.setAttribute('text-anchor', 'middle');
        valueText.setAttribute('font-size', '11');
        valueText.setAttribute('font-weight', '500');
        valueText.setAttribute('fill', '#1a1a1a');
        valueText.setAttribute('opacity', '0');
        valueText.textContent = value + '%';
        svg.appendChild(valueText);
        
        setTimeout(() => {
            valueText.style.transition = 'opacity 0.3s ease';
            valueText.setAttribute('opacity', '1');
        }, index * 100 + 300);
        
        // Month label
        const monthText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        monthText.setAttribute('x', x + width / 2);
        monthText.setAttribute('y', topPadding + chartHeight + 25);
        monthText.setAttribute('text-anchor', 'middle');
        monthText.setAttribute('font-size', '11');
        monthText.setAttribute('fill', '#6b7280');
        monthText.textContent = months[index];
        svg.appendChild(monthText);
    });
    
    // Y-axis labels
    for (let i = 0; i <= 5; i++) {
        const value = Math.round(minValue + (range / 5) * (5 - i));
        const y = topPadding + (chartHeight / 5) * i;
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', leftPadding - 10);
        label.setAttribute('y', y + 4);
        label.setAttribute('text-anchor', 'end');
        label.setAttribute('font-size', '10');
        label.setAttribute('fill', '#9ca3af');
        label.textContent = value + '%';
        svg.appendChild(label);
    }
    
    graphContainer.appendChild(svg);
    container.appendChild(graphContainer);
}
