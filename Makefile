# AI Agent Production Readiness Check - Development Commands
# ============================================================

# Package manager (change to pnpm or yarn if preferred)
PKG_MANAGER := npm
RUN := $(PKG_MANAGER) run

# Colors for output
GREEN := \033[0;32m
YELLOW := \033[0;33m
NC := \033[0m # No Color

.PHONY: help install dev run build preview lint lint-fix format format-check typecheck test test-watch test-coverage clean reset all

# Default target
help: ## Show this help message
	@echo "$(GREEN)AI Agent Production Readiness Check - Available Commands$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'
	@echo ""

# ============================================================
# Setup & Installation
# ============================================================

install: ## Install dependencies
	$(PKG_MANAGER) install

install-ci: ## Install dependencies (CI mode, no lockfile update)
	$(PKG_MANAGER) ci

# ============================================================
# Development
# ============================================================

dev: ## Start development server with hot reload
	$(RUN) dev

run: dev ## Alias for dev

start: dev ## Alias for dev

preview: ## Preview production build locally
	$(RUN) preview

# ============================================================
# Build
# ============================================================

build: ## Build for production
	$(RUN) build

build-dev: ## Build for development (no minification)
	$(RUN) build --mode development

# ============================================================
# Code Quality
# ============================================================

lint: ## Run ESLint
	$(RUN) lint

lint-fix: ## Run ESLint with auto-fix
	$(RUN) lint:fix

format: ## Format code with Prettier
	$(RUN) format

format-check: ## Check code formatting without changes
	$(RUN) format:check

typecheck: ## Run TypeScript type checking
	$(RUN) typecheck

check: lint typecheck ## Run all code quality checks (lint + typecheck)

# ============================================================
# Testing
# ============================================================

test: ## Run tests
	$(RUN) test

test-watch: ## Run tests in watch mode
	$(RUN) test:watch

test-coverage: ## Run tests with coverage report
	$(RUN) test:coverage

test-ui: ## Run tests with UI (Vitest UI)
	$(RUN) test:ui

# ============================================================
# Cleanup
# ============================================================

clean: ## Clean build artifacts
	rm -rf dist
	rm -rf coverage
	rm -rf .vite

clean-deps: ## Remove node_modules
	rm -rf node_modules

reset: clean clean-deps install ## Full reset: clean everything and reinstall

# ============================================================
# All-in-one Commands
# ============================================================

all: install lint typecheck test build ## Run full CI pipeline

ci: install-ci lint typecheck test build ## Run CI pipeline (for CI environments)

pre-commit: lint-fix format typecheck test ## Run before committing
