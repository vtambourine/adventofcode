package day07

import (
	"fmt"
	"github.com/vtambourine/adventofcode/2020/challenge"
	"github.com/vtambourine/adventofcode/2020/util"
	"strings"
)

type bagType string

type baggageRules map[bagType]map[bagType]int

func parseBaggageRules(input *challenge.Challenge) baggageRules {
	result := baggageRules{}

	for line := range input.Lines() {
		parts := strings.Split(line, " bags contain ")
		outer := bagType(parts[0])

		result[outer] = map[bagType]int{}

		if parts[1] != "no other bags." {
			for _, inner := range strings.Split(parts[1], ", ") {
				parts := strings.Split(inner, " ")
				result[outer][bagType(fmt.Sprintf("%s %s", parts[1], parts[2]))] = util.MustAtoi(parts[0])
			}
		}
	}

	return result
}

func (r baggageRules) canContain(start, target bagType) bool {
	if n, ok := r[start][target]; ok && n > 0 {
		return true
	}

	for k := range r[start] {
		if r.canContain(k, target) {
			return true
		}
	}

	return false
}

func (r baggageRules) cost(t bagType) int {
	totalCost := 1

	for rule, n := range r[t] {
		totalCost += n * r.cost(rule)
	}

	return totalCost
}
