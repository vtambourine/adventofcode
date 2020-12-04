package day04

import (
	"github.com/vtambourine/adventofcode/2020/challenge"
)

func ValidPassports(c *challenge.Challenge) int {
	count := 0

	lines := c.Lines()
	for {
		p, ok := parsePassport(lines)

		if p.valid() {
			count++
		}

		if !ok {
			break
		}
	}

	return count
}

func StrictlyValidPassports(c *challenge.Challenge) int {
	count := 0

	lines := c.Lines()
	for {
		p, ok := parsePassport(lines)

		if p.strictlyValid() {
			count++
		}

		if !ok {
			break
		}
	}

	return count
}
