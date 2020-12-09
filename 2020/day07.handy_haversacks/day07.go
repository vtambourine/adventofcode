package day07

import (
	"fmt"
	"github.com/vtambourine/adventofcode/2020/command"
	"strings"

	"github.com/vtambourine/adventofcode/2020/challenge"
	"github.com/vtambourine/adventofcode/2020/util"
)

type bag string
type baggageRules map[bag]map[bag]int

func (r baggageRules) canContain(a, b bag) bool {
	if n, ok := r[a][b]; ok && n > 0 {
		return true
	}

	for k := range r[a] {
		if r.canContain(k, b) {
			return true
		}
	}

	return false
}

func (r baggageRules) cost(a bag) int {
	cost := 1

	for rule, n := range r[a] {
		cost += n * r.cost(rule)
	}

	return cost
}

func parseBaggageRules(c *challenge.Challenge) baggageRules {
	result := baggageRules{}

	for line := range c.Lines() {
		parts := strings.Split(line, " bags contain ")
		outer := bag(parts[0])

		result[outer] = map[bag]int{}

		if parts[1] != "no other bags." {
			for _, inner := range strings.Split(parts[1], ", ") {
				parts := strings.Split(inner, " ")
				result[outer][bag(fmt.Sprintf("%s %s", parts[1], parts[2]))] = util.MustAtoi(parts[0])
			}
		}
	}
	return result
}

func Colors(c *challenge.Challenge) int {
	result := parseBaggageRules(c)

	count := 0
	for b := range result {
		if result.canContain(b, "shiny gold") {
			count++
		}
	}

	return count
}

func Cost(c *challenge.Challenge) int {
	result := parseBaggageRules(c)
	return result.cost("shiny gold") - 1
}

func Register(s command.Solutions) {
	s.Register(7, "a", Colors)
	s.Register(7, "b", Cost)
}
